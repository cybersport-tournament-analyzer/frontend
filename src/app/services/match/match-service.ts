import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {catchError, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private  http:HttpClient) { }

  getInfoSeries(seriesId:string){
    return this.http.get(`${environment.matchSource}/series/${seriesId}`).pipe(

      catchError(error => {
        console.error("Ошибка получения серии:", error);
        return of(false);
      })
    )
  }

}
