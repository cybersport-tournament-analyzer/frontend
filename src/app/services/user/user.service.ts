import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {catchError, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http:HttpClient) { }

  getAllUsers(){
    return this.http.get(`${environment.userSource}/users?page=0&size=1000`).pipe(

      catchError(error => {
        console.error("Ошибка получения серии:", error);
        return of(false);
      })
    )
  }
}
