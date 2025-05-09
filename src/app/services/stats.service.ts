import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.development';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http:HttpClient) { }

  getComparePlayersInMatch(seriesId:string,marchId:number){
    return  this.http.get(`${environment.statsSource}/comparison/${seriesId}/${marchId}`)
  }
  getComparePlayersInSeries (seriesId:string){
    return  this.http.get(`${environment.statsSource}/comparison/${seriesId}`)
  }
}
