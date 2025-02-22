import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment.development';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {catchError, mapTo, Observable, of, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private  accessToken:string|null = null;
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: any | null=null;


  constructor(private http: HttpClient, private cookieService:CookieService){
    // this.getInfo().subscribe((data)=>{
    //   console.log("Получили данные ")
    // })
  }


  //@ts-ignore
  async getUser(): any {

    console.log("getUser")
    if (this.loggedUser == null) {
      console.log("in if getUser")
      await this.getInfo().toPromise().then((data: any) => {
        return this.loggedUser = data.attributes
      });
      console.log(this.loggedUser)
      console.log("end if getUser")
      return this.loggedUser;

    }
    console.log("not if getUser")
    return this.loggedUser;
  }

  getInfo(): Observable<boolean> {
    console.log("getInfo")
    return this.http.get<any>(`${environment.authSource}/profile`)
    .pipe(
    tap((user:any) =>{
      console.log("k",user)
      this.loggedUser = user.attributes}),

    // catchError(error => {
    //   // alert(error.error);
    //   console.log("proebali")
    //   return throwError(`Ошибка при запросе информации о пользователе ${error}`);
    // })
    );
  }
login(): Observable<boolean> {
  return this.http.get<any>(`${environment.authSource}/auth/login`)
    // .pipe(
      // tap(tokens => this.doLoginUser(user.username, tokens)),
      // mapTo(true),
      // catchError(error => {
      //   alert(error.error);
      //   return of(false);
      // })
    // );
}
async auth(token: String) {
  console.log(token);
  await this.doLoginUser(token);

}

logout() {
  return this.http.post<any>(`${environment.authSource}/auth/logout`, {
    // 'refreshToken': this.getRefreshToken()
  }).pipe(
    tap(() => this.doLogoutUser()),
    mapTo(true),
    catchError(error => {
      alert(error.error);
      return of(false);
    }));
}

isLoggedIn() {
    console.log("isLoggedIn")
  if (!this.accessToken){
    return this.cookieService.get(this.JWT_TOKEN)
  }
  return !!this.accessToken;
}

refreshToken() {

  return this.http.post<any>(`${environment.authSource}/auth/refresh`, {
    // 'refreshToken': this.getRefreshToken()
  },{
    withCredentials: true
  }).pipe(tap((tokens) => {
    console.log(tokens)
    this.storeJwtToken(tokens.accessToken);
  }));
}

getJwtToken() {
  // if (typeof window !== 'undefined' && window.localStorage) {
  // return localStorage.getItem(this.JWT_TOKEN);
  // }
  // return null;
  // return this.accessToken;
  return this.cookieService.get(this.JWT_TOKEN)
}

private async doLoginUser(tokens: any) {
  this.storeTokens(tokens);
  // this.getInfo().subscribe((user:any)=>{
  //   console.log(user)
  //   this.loggedUser = user.attributes
  //   console.log("doLoginUser",this.loggedUser)
  // });
  try {
    const user: any = await this.getInfo().toPromise(); // Ожидание завершения запроса
    // this.loggedUser = user.attributes;
    console.log("doLoginUser", this.loggedUser);
  } catch (error) {
    console.error("Ошибка при получении информации о пользователе", error);
    // this.doLogoutUser();
  }
}

private doLogoutUser() {
  this.loggedUser = null;
  this.removeTokens();
}

private getRefreshToken() {
  // if (typeof window !== 'undefined' && window.localStorage) {
  return localStorage.getItem(this.REFRESH_TOKEN);


}

private storeJwtToken(jwt: string) {
  // localStorage.setItem(this.JWT_TOKEN, jwt);
  this.cookieService.set(this.JWT_TOKEN,jwt)
  this.accessToken=jwt;
  }


private storeTokens(tokens:any) {
  this.accessToken=tokens;
  this.cookieService.set(this.JWT_TOKEN,tokens)
  // localStorage.setItem(this.JWT_TOKEN, tokens);
  // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
}

private removeTokens() {
  this.accessToken=null;
  this.cookieService.delete(this.JWT_TOKEN)

  // localStorage.removeItem(this.JWT_TOKEN);
  // localStorage.removeItem(this.REFRESH_TOKEN);
}



}
