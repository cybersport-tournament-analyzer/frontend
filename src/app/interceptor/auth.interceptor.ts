// import {inject, Injectable} from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError, BehaviorSubject } from 'rxjs';
// import { catchError, filter, take, switchMap } from 'rxjs/operators';
// import {AuthService} from '../services/http.authService';
// import { Router } from '@angular/router'; // Импортируем Router
//
// @Injectable()
// export class authInterceptor implements HttpInterceptor {
//
//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//   private router;
//
//   constructor(public authService: AuthService) {
//     this.router = inject(Router);
//   }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//
//     console.log("pizda")
//     if (this.authService.getJwtToken()) {
//       request = this.addToken(request, this.authService.getJwtToken());
//     }
//
//     return next.handle(request).pipe(catchError(error => {
//       console.log("z",error)
//       if (error instanceof HttpErrorResponse && error.status === 401 && error.error.message != 'Token not valid: No cookie refresh token') {
//         // if (error.error.url == "/auth/refresh"){
//         //   console.log("chto za huina")
//         //   this.isRefreshing = false;
//         //   // this.authService.logout(); // (Опционально) Выход пользователя
//         //   console.log("chekout")
//         //   this.router.navigate(['/error']); // Переход на страницу ошибки
//         //   console.log("chekout after")
//         //   return throwError(error);
//         // }else{
//         //   console.log(error)
//           return this.handle401Error(request, next);
//         // }
//
//       } else {
//         return this.refreshErrorHandle(request, next)
//         // console.log("andere error")
//         // this.router.navigate(['/error']); // Переход на страницу ошибки
//         // return throwError(error);
//       }
//     }));
//   }
//
//   private addToken(request: HttpRequest<any>, token: any) {
//     return request.clone({
//       setHeaders: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//   }
//
//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       console.log("ne else blya epta nahui zaebali kto chitaet tot pidr ")
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);
//
//       return this.authService.refreshToken().pipe(
//         switchMap((token: any) => {
//           this.isRefreshing = false;
//           console.log("поменял ")
//           this.refreshTokenSubject.next(token.accessToken);
//           return next.handle(this.addToken(request, token.accessToken));
//         })
//       );
//
//     } else {
//       console.log("else blya ")
//       return this.refreshTokenSubject.pipe(
//         filter(token => token != null),
//         take(1),
//         switchMap(jwt => {
//           return next.handle(this.addToken(request, jwt));
//         }));
//     }
//   }
//
//   private refreshErrorHandle(request: HttpRequest<any>, next: HttpHandler) {
//     this.router.navigate(['/error']); // Переход на страницу ошибки
//     return next.handle(request);
//
//   }
// }


import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/http.authService';
import { Router } from '@angular/router';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private router;

  constructor(public authService: AuthService) {
    this.router = inject(Router);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept')
    console.log(this.authService.getJwtToken())
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(
      catchError((error) => {
        console.log("errorsssssss",error)
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (error.error.url !== '/auth/refresh') {
            return this.handle401Error(request, next);
          } else {
            return this.refreshErrorHandle(request, next); // ошибка на рефреш токен
          }
        } else {
          // return this.refreshErrorHandle(request, next); // Переход на страницу ошибки
          return throwError(error)
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: any) {
    console.log(request)
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          return next.handle(this.addToken(request, token.accessToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          return this.refreshErrorHandle(request, next);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }

  private refreshErrorHandle(request: HttpRequest<any>, next: HttpHandler) {
    this.router.navigate(['/error']); // Переход на страницу ошибки
    return throwError(()=>{'Token refresh failed. Redirecting to error page.'});
  }
}
