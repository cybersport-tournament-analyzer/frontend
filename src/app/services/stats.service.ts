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
  getGameStatsByMatch(playerId:string,seriesId:string,seriesOrder:number ){
    return this.http.get(`${environment.statsSource}/game-stats/players/${playerId}/match/${seriesId}/${seriesOrder}`)
  }
  getDuelsByOrder(seriesId:string,seriesOrder:number){
    return this.http.get(`${environment.statsSource}/duels/${seriesId}/${seriesOrder}`)
  }
  getDuelsBySeries(seriesId:string){
    return this.http.get(`${environment.statsSource}/duels/${seriesId}`)
  }
  getGameStatsBySeries(seriesId:string,playerId:string){
    return this.http.get(`${environment.statsSource}/game-stats/players/${playerId}/series/${seriesId}`)
  }
  getTournamentStats(tournamentId:string){
    return this.http.get(`${environment.statsSource}/stats/tournaments/${tournamentId}`)
  }

  getGameStatsByGlobalUsers(playerId:string){
    return this.http.get(`${environment.statsSource}/game-stats/players/${playerId}/global`)
  }
  getMetaStatsByGlobalUsers(playerId:string){
    return this.http.get(`${environment.statsSource}/meta-stats/players/${playerId}/global`)
  }
  getWeaponStatsByGlobalUsers(playerId:string){
    return this.http.get(`${environment.statsSource}/weapons/players/${playerId}/global`)
  }

}
