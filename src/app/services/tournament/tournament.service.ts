import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as http from 'http';
import {environment} from '../../../environments/environment.development';
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  matches:any[]=[]
  constructor(private http: HttpClient) {

  }
  private objectSubject = new BehaviorSubject<{ [key: string]: any }>({
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "tournamentName": "string",
    "creatorId": "string",
    "teamsCount": 0,
    "substitutionsNumber": 0,
    "tournamentMode": "string",
    "winnerTeamName": "string",
    "createdAt": "2025-04-23T13:04:22.398Z",
    "registrationStartTime": "2025-04-23T13:04:22.398Z",
    "registrationEndTime": "2025-04-23T13:04:22.398Z",
    "tournamentStartTime": "2025-04-23T13:04:22.398Z",
    "tournamentStatus": "ACTIVE",
    "currentStageOrder": 0,
    "stages": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "tournamentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "stageOrder": 0,
        "stageType": "string",
        "totalRounds": 0,
        "finalMatchFormat": "string",
        "matchFormat": "string",
        "matchForTheThirdPlace": true,
        "numberOfGroups": 0,
        "teamsToAdvance": 0,
        "matches": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "tournamentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "matchFormat": "string",
            "team1Score": 0,
            "team2Score": 0,
            "round": 0,
            "matchNumber": 0,
            "winnerTeamName": "string",
            "team1Name": "string",
            "team2Name": "string",
            "schedule": {
              "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "matchId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "scheduledStartTime": "2025-04-23T13:04:22.398Z",
              "actualStartTime": "2025-04-23T13:04:22.398Z",
              "actualEndTime": "2025-04-23T13:04:22.398Z",
              "status": "SCHEDULED"
            },
            "groupLetter": "string"
          }
        ]
      }
    ],
    "teams": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "tournamentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "teamName": "string",
        "flag": "string",
        "creatorSteamId": "string",
        "averageRating": 0,
        "seed": 0,
        "players": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "playerSteamId": "string",
            "inGameRoles": [
              "Lurker"
            ]
          }
        ]
      }
    ]
  })

  getTournamentData(tournamentId:string){

    // return this.objectSubject.asObservable().pipe(
    //   tap(data => this.prepareMatches(data)),
    //   catchError(error => {
    //     console.error("Ошибка при запросе профиля:", error);
    //     return throwError(() => new Error(`Ошибка профиля: ${error.statusText || error.message}`));
    //   })
    // );
    return this.http.get<any>(`${environment.tournamentSource}/tournaments/${tournamentId}`).pipe(
      map((data:any) => {
        const matches = data.stages.map((stage:any)=> {return stage.matches})
        let resMetches:any[]=[]
        for (const match of matches) {
          resMetches= resMetches.concat(match)
        }
        data.matchSchedule=resMetches
        return data
        }

      ),
      // mapTo(true),
      catchError(error => {
        console.error("Ошибка логина:", error);
        return of(false);
      })
    );
  }
  getAllTournament(){

    // return this.objectSubject.asObservable().pipe(
    //   tap(data => this.prepareMatches(data)),
    //   catchError(error => {
    //     console.error("Ошибка при запросе профиля:", error);
    //     return throwError(() => new Error(`Ошибка профиля: ${error.statusText || error.message}`));
    //   })
    // );
    return this.http.get<any>(`${environment.tournamentSource}/tournaments?page=0&size=100`).pipe(
      // tap(data => {
      //
      //   console.log("getAllTournamentgetAllTournamentgetAllTournamentgetAllTournament")
      //   console.log( data.stages.map((stage:any)=> {return stage.matches}))}),
      // mapTo(true),
      catchError(error => {
        console.error("Ошибка логина:", error);
        return of(false);
      })
    );
  }
  prepareMatches(data:any){

    for (const stage of data.stages) {
      for (const match of stage.matches) {
        this.matches.push({
          "id": match.id,
          "tournamentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          teams:[
            {
              "teamScore": match.team1Score,
              "teamName": match.team1Name,
            },{
              "teamScore":  match.team2Score,
              "teamName": match.team2Name,
            }
          ],
          "matchFormat": match.matchFormat,


          "round": 0,
          "matchNumber": 0,
          "winnerTeamName": "string",

          "status":  match.schedule.status,
          "scheduledStartTime":match.schedule.scheduledStartTime
        })
      }
    }
  }
  getMatchSchedule(){
    console.log("aaaaaaaaaaaaaaaaaaaa")
    return this.matches
  }
  createTournament(form:any){
    return this.http.post<any>(`${environment.tournamentSource}/tournaments`, {...form}, { }).pipe(

      catchError(error => {
        console.error("Ошибка создания турнира:", error);
        return throwError(error);
      })
    );
  }
  getStageStandings(stageId:string){
    return this.http.get<any>(`${environment.tournamentSource}/stage/${stageId}/standings`).pipe(
      // tap(data => {
      //
      //   console.log("getAllTournamentgetAllTournamentgetAllTournamentgetAllTournament")
      //   console.log( data.stages.map((stage:any)=> {return stage.matches}))}),
      // mapTo(true),
    //   map((data:any)=>{
    //     d
    // }),
      catchError(error => {
        console.error("Ошибка логина:", error);
        return of(false);
      })
    );
  }
  getStageSingleEl(stageId:string){
    return this.http.get<any>(`${environment.tournamentSource}/stage/${stageId}/bracket`).pipe(
      // tap(data => {
      //
      //   console.log("getAllTournamentgetAllTournamentgetAllTournamentgetAllTournament")
      //   console.log( data.stages.map((stage:any)=> {return stage.matches}))}),
      // mapTo(true),
      //   map((data:any)=>{
      //     d
      // }),
      catchError(error => {
        console.error("Ошибка логина:", error);
        return of(false);
      })
    );
  }
  getLinkToTournament(tournamentId:string){
    // return `${environment.host}/tournament/${tournamentId}`
  }
  createTeamOnTournament(tournamentId:string,form:any){

    return this.http.post<any>(`${environment.tournamentSource}/teams/${tournamentId}/create`,{
      ...form
    })


  }
  getStandingsTournament(tournamentId:string){

    console.log("getStandingsTournament")
    console.log(`${environment.tournamentSource} /tournaments/${tournamentId}/standings`)
    return this.http.get<any>(`${environment.tournamentSource}/tournaments/${tournamentId}/standings`).pipe(
      // tap(data => {
      //
      //   console.log("getAllTournamentgetAllTournamentgetAllTournamentgetAllTournament")
      //   console.log( data.stages.map((stage:any)=> {return stage.matches}))}),
      // mapTo(true),
      //   map((data:any)=>{
      //     d
      // }),
      catchError(error => {
        console.error("Ошибка при получении результатов турнира :", error);
        return of(false);
      })
    );
  }

  test(){
    return this.http.get<any>(`http://176.98.178.99:8083/stats/tournaments/1d0d1118-d419-4b03-8a20-018b172e012a`).pipe(
      // tap(data => {
      //
      //   console.log("getAllTournamentgetAllTournamentgetAllTournamentgetAllTournament")
      //   console.log( data.stages.map((stage:any)=> {return stage.matches}))}),
      // mapTo(true),
      //   map((data:any)=>{
      //     d
      // }),
      catchError(error => {
        console.error("Ошибка при получении результатов турнира :", error);
        return of(false);
      })
    );
  }
}
