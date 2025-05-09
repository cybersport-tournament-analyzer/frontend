import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, concatMap, map, mapTo, of, shareReplay, tap, throwError} from 'rxjs';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.development';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private readonly JWT_TOKEN = 'JWT_TOKEN';
//   private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
//   private accessToken: string | null = null;
//   private loggedUser$!: Observable<any>; // кешированный поток для пользователя
//
//   public userInfo:any
//
//   // Используем BehaviorSubject для хранения данных пользователя
//   private loggedUserSubject = new BehaviorSubject<any>(null); // Начальное значение null
//
//   constructor(private http: HttpClient, private cookieService: CookieService) {}
//
//   // ✅ Получаем пользователя (с кешированием)
//   getUser() {
//     if (!this.loggedUserSubject.getValue()) { // Если данные еще не загружены
//       console.log("Fetching user data...");
//       this.getInfo().pipe(
//         // map((data: any) => data.attributes),
//         tap(user => {
//           console.log("User Fetched:", user.attributes);
//           this.loggedUserSubject.next(user); // Обновляем данные пользователя в BehaviorSubject
//         }),
//         catchError(error => {
//           console.error("Ошибка при получении пользователя:", error);
//           this.loggedUserSubject.next(null); // Если ошибка, устанавливаем null
//           return of(null);
//         })
//       ).subscribe();
//     } else {
//       console.log("Using cached user data");
//     }
//     return this.loggedUserSubject.asObservable(); // Возвращаем Observable для подписки
//   }
//
//   // ✅ Получаем информацию о пользователе с API
//   private getInfo() {
//     // console.log("getInfo");
//     return this.http.get<any>(`${environment.authSource}/profile`).pipe(
//       tap(user => this.userInfo=user),
//       catchError(error => {
//         console.error("Ошибка при запросе профиля:", error);
//         return throwError(() => new Error(`Ошибка профиля: ${error.statusText || error.message}`));
//       })
//     );
//   }
//   getHeaderUser(){
//     return this.userInfo
//   }
//
//   // ✅ Логин (можно доработать под OAuth/SSO)
//   login(): Observable<boolean> {
//     console.log("login")
//     return this.http.get<any>(`${environment.authSource}/auth/login`).pipe(
//
//       tap(tokens => this.storeTokens(tokens)),
//       // mapTo(true),
//       catchError(error => {
//         console.error("Ошибка логина:", error);
//         return of(false);
//       })
//     );
//   }
//
//   // ✅ Аутентификация по токену
//   auth(token: string): Observable<boolean> {
//     console.log("Auth token:", token);
//     return of(token).pipe(
//       tap(tok => this.storeJwtToken(tok)),
//       concatMap(()=>this.getUser()),
//       mapTo(true)
//     );
//   }
//
//   // ✅ Выход из аккаунта
//   logout(): Observable<boolean> {
//     return this.http.post<any>(`${environment.authSource}/auth/logout`, {}).pipe(
//       tap(() => this.doLogoutUser()),
//       mapTo(true),
//       catchError(error => {
//         console.error("Ошибка выхода:", error);
//         return of(false);
//       })
//     );
//   }
//
//   // ✅ Проверка авторизации пользователя
//   isLoggedIn(): boolean {
//     console.log("isLoggedIn");
//     return !!this.accessToken || !!this.cookieService.get(this.JWT_TOKEN);
//   }
//
//   // ✅ Обновление JWT токена
//   refreshToken(): Observable<any> {
//     return this.http.post<any>(`${environment.authSource}/auth/refresh`, {}, { withCredentials: true }).pipe(
//       tap(tokens => this.storeJwtToken(tokens.accessToken)),
//       catchError(error => {
//         console.error("Ошибка обновления токена:", error);
//         return throwError(() => new Error('Не удалось обновить токен'));
//       })
//     );
//   }
//
//   // ✅ Получение JWT токена
//   getJwtToken(): string | null {
//     return this.accessToken || this.cookieService.get(this.JWT_TOKEN);
//   }
//
//   // ✅ Хранилище токена в cookies
//   private storeJwtToken(jwt: string) {
//     this.cookieService.set(this.JWT_TOKEN, jwt);
//     // this.cookieService.set(this.REFRESH_TOKEN, jwt);
//     this.accessToken = jwt;
//     console.log( "wtf",this.accessToken)
//   }
//
//   // ✅ Сохранение токенов (JWT и Refresh)
//   private storeTokens(tokens: any) {
//     console.log("storeTokens",tokens)
//     this.accessToken = tokens.accessToken;
//     this.cookieService.set(this.JWT_TOKEN, tokens.accessToken);
//     // if (tokens.refreshToken) {
//     //   localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
//     // }
//   }
//
//   // ✅ Удаление токенов
//   private removeTokens() {
//     this.accessToken = null;
//     this.cookieService.delete(this.JWT_TOKEN);
//     // this.cookieService.delete(this.REFRESH_TOKEN);
//     // localStorage.removeItem(this.REFRESH_TOKEN);
//   }
//
//   // ✅ Выход и очистка состояния
//   private doLogoutUser() {
//     this.loggedUser$ = undefined!;
//     this.removeTokens();
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private accessToken: string | null = null;
  private loggedUser$!: Observable<any>; // кешированный поток для пользователя

  private userRequest$?: Observable<any>; // кэшируем текущий запрос

  // Используем BehaviorSubject для хранения данных пользователя
  private loggedUserSubject = new BehaviorSubject<any>(null); // Начальное значение null

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // ✅ Получаем пользователя (с кешированием)
  // getUser() {
  //   // if (!this.loggedUserSubject.getValue()) { // Если данные еще не загружены
  //   //   // console.log("Fetching user data...");
  //   //   this.getInfo().pipe(
  //   //     // map((data: any) => data.attributes),
  //   //     tap(user => {
  //   //       // console.log("User Fetched:", user.attributes);
  //   //       this.loggedUserSubject.next(user); // Обновляем данные пользователя в BehaviorSubject
  //   //     }),
  //   //     catchError(error => {
  //   //       console.error("Ошибка при получении пользователя:", error);
  //   //       // this.loggedUserSubject.next(null); // Если ошибка, устанавливаем null
  //   //       return of(null);
  //   //     })
  //   //   ).subscribe();
  //   // } else {
  //   //   // console.log("Using cached user data");
  //   // }
  //   // return this.loggedUserSubject.asObservable(); // Возвращаем Observable для подписки
  //
  //
  //   const cachedUser = this.loggedUserSubject.getValue();
  //
  //   if (cachedUser) {
  //     // ✅ Уже есть пользователь
  //     return this.loggedUserSubject.asObservable();
  //   }
  //
  //   if (!this.userRequest$) {
  //     // 👇 Создаем новый запрос, если он еще не создан
  //     this.userRequest$ = this.getInfo().pipe(
  //       tap(user => {
  //         this.loggedUserSubject.next(user);
  //         this.userRequest$ = undefined; // сброс запроса после выполнения
  //       }),
  //       catchError(error => {
  //         console.error("Ошибка при попытке перебить запрос :", error);
  //         this.userRequest$ = undefined; // сброс при ошибке тоже
  //         return throwError(() => new Error(`Ошибка профиля: ${error?.statusText || error?.message}`));
  //         // return of(null);
  //       }),
  //       shareReplay(1) // 💡 делаем поток "горячим" и переиспользуем результат
  //     );
  //   }
  //
  //   return this.userRequest$; // ✅ Возвращаем текущий (или уже завершенный) запрос
  // }

  getUser(): Observable<any> {
    const cachedUser = this.loggedUserSubject.getValue();

    if (cachedUser) {
      return this.loggedUserSubject.asObservable();
    }

    if (!this.userRequest$) {
      this.userRequest$ = this.getInfo().pipe(
        tap(user => {
          this.loggedUserSubject.next(user);
          this.userRequest$ = undefined;
        }),
        catchError(error => {
          console.error("Ошибка при попытке перебить запрос :", error);
          this.loggedUserSubject.next(null); // ❗ ОБЯЗАТЕЛЬНО сбрасывай subject
          this.userRequest$ = undefined;

          return throwError(() => new Error("Ошибка профиля: " + error?.message));
        }),
        shareReplay(1)
      );
    }

    return this.userRequest$;
  }


  // ✅ Получаем информацию о пользователе с API
  private getInfo() {
    // console.log("getInfo");
    return this.http.get<any>(`${environment.authSource}/profile`,{},).pipe(
      // tap(user => console.log("Profile Data:", user)),
      catchError(error => {
        console.error("Ошибка при запросе профиля:", error);
        return throwError(() => new Error(`Ошибка профиля: ${error?.statusText || error?.message}`));
      })
    );
  }

  // ✅ Логин (можно доработать под OAuth/SSO)
  login(): Observable<boolean> {
    return this.http.get<any>(`${environment.authSource}/auth/login`).pipe(
      // tap(tokens => this.storeTokens(tokens)),
      // mapTo(true),
      catchError(error => {
        console.error("Ошибка логина:", error);
        return of(false);
      })
    );
  }

  // ✅ Аутентификация по токену
  auth(token: string): Observable<boolean> {
    // console.log("Auth token:", token);
    return of(token).pipe(
      tap(tok => this.storeJwtToken(tok)),
      concatMap(()=>this.getUser()),
      mapTo(true)
    );
  }

  // ✅ Выход из аккаунта
  logout(): Observable<boolean> {
    // console.log("logout")
    return this.http.post<any>(`${environment.authSource}/auth/logout`, {}).pipe(
      tap(() => this.doLogoutUser()),

      mapTo(true),
      catchError(error => {
        console.log("Ошибка выхода:", error);
        return of(false);
      })
    );
  }

  // ✅ Проверка авторизации пользователя
  isLoggedIn(): boolean {
    // console.log("isLoggedIn");

    return !!this.accessToken || !!this.cookieService.get(this.JWT_TOKEN);
  }

  // ✅ Обновление JWT токена
  refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.authSource}/auth/refresh`, {}, { withCredentials: true }).pipe(
      tap(tokens => this.storeJwtToken(tokens.accessToken)),
      catchError(error => {
        console.error("Ошибка обновления токена:", error);
        return throwError(() => new Error('Не удалось обновить токен'));
      })
    );
  }

  // ✅ Получение JWT токена
  getJwtToken(): string | null {
    return this.accessToken || this.cookieService.get(this.JWT_TOKEN);
  }

  // ✅ Хранилище токена в cookies
  private storeJwtToken(jwt: string) {
    // console.log("storeJwtToken ppppppppp")
    this.cookieService.set(this.JWT_TOKEN, jwt);
    this.accessToken = jwt;
    // console.log( "wtf",this.accessToken)
  }

  // ✅ Сохранение токенов (JWT и Refresh)
  private storeTokens(tokens: any) {
    this.accessToken = tokens.accessToken;
    this.cookieService.set(this.JWT_TOKEN, tokens.accessToken);
    // if (tokens.refreshToken) {
    //   localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    // }
  }

  // ✅ Удаление токенов
  private removeTokens() {
    // console.log("removeTokens")
    this.accessToken = null;
    this.cookieService.delete(this.JWT_TOKEN);
    // localStorage.removeItem(this.REFRESH_TOKEN);
  }

  // ✅ Выход и очистка состояния
  private doLogoutUser() {
    // console.log("doLogoutUser")
    this.loggedUserSubject.next(null);
    this.removeTokens();
  }

  setJwtToken(token: string): void {
    this.cookieService.set(this.JWT_TOKEN, token);
  }
}
