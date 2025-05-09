import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {catchError, Observable, of, throwError} from 'rxjs';
import * as http from 'http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private  http:HttpClient) { }

  getInfoSeries(seriesId:string){
    return this.http.get(`${environment.matchSource}/series/${seriesId}`).pipe(

      catchError(error => {
        console.error("Ошибка получения серии:", error);
        return  throwError((error:any)=>error)
        // return of(false);
      })
    )
  }

}
