import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, mapTo, Observable, of, tap} from 'rxjs';
import { Client, Message } from '@stomp/stompjs'; // <-- Тут должен быть импорт
import SockJS from 'sockjs-client';
import {environment} from '../../environments/environment.development';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private client!: any;
  public lobby$ = new BehaviorSubject<string[]>([]);
  // public matchStatus$ = new BehaviorSubject<string>('');
  public timer$ = new BehaviorSubject<string>('');
  public match$ = new BehaviorSubject<string>('');
  public me:any = null

  constructor(private http: HttpClient) {
    console.log('🔄 Инициализация WebSocket...');

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${environment.matchSource}/ws`),
      debug: (msg) => console.log('STOMP DEBUG:', msg),
      reconnectDelay: 5000,
    });

    console.log('✅ WebSocket клиент создан:', this.client);
  }

  getClient(){
    return this.client
  }
  createLobby(id:any,form:any):Observable<boolean> {
    console.log("in websocket service")
    return this.http.post<any>(`${environment.matchSource}/create`, {
      'steamId': id,
      ...form
    }).pipe(
      tap((data) => console.log(data)),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }
  getLobbys():Observable<any[]>{
    return this.http.get<any[]>(`${environment.matchSource}/lobby`)
  }

  connectToLobby(lobbyId:string){
    console.log("aaaaa",this.client)
    this.client.onConnect = () =>
    {
      console.log('🟢 WebSocket подключен!');

      this.client.subscribe('/topic/lobby/'+lobbyId, (message: Message) => {
        console.log('🎮 Обновление лобби:');
        console.log('🎮 Обновление лобби:', message.body);
        this.lobby$.next(JSON.parse(message.body));

        console.log(this.lobby$,'ZZVZVZVZVZVZV')
      });
      this.client.subscribe('/topic/lobby/'+lobbyId+'/time/', (message: Message) => {
        this.timer$.next(JSON.parse(message.body));
      });


      this.client.publish({ destination: "/app/getLobby", body: lobbyId });
    };

    this.client.onStompError = (frame: any) => {
      console.error('❌ STOMP Ошибка:', frame);
    };
    this.client.activate(); // <-- Если этот лог не срабатывает, WebSocket не запускается
    console.log('🚀 WebSocket активирован!');
  }

  connectToMatch(lobbyId:string){

    console.log("aaaaa",lobbyId)
    console.log('🟢 WebSocket матча  подключен!');

      this.client.subscribe('/topic/match/'+lobbyId, (message: Message) => {
        console.log('🎮 Обновление матча:', message.body);
        this.match$.next(JSON.parse(message.body));

      });
      console.log("Просим матч")
      this.client.publish({ destination: "/app/getMatch", body: lobbyId });

  }


  joinLobby(playerName: string) {
    console.log("in joinLobby ", playerName)
      // this.client.send("/app/join", {},playerName );
    // if (this.client && this.client.connected) {
      this.client.publish({ destination: '/app/join', body: playerName });
    // } else {
    //   console.error('WebSocket не подключен, повторите попытку позже');
    // }
  }
   joinTeam(lobbyId:any, steamId:any,slot:any) {
     this.client.publish({
      destination: "/app/join",
      body: JSON.stringify({ lobbyId, steamId, slot })
    });
  }
   setReady(lobbyId:any, steamId:any,ready:boolean) {
    console.log("in ws Socket ",ready)
     this.client.publish({
      destination: "/app/ready",
      body: JSON.stringify({ lobbyId, steamId, ready })
    });
  }


  pickBan(message:{lobbyId?:string,steamId?:string,action?:string,map?:string}){
    this.client.publish({
      destination: "/app/pickban",
      body: JSON.stringify(message)
    });
  }
  startMatch() {
    this.client.publish({ destination: '/app/ready' });
  }


  // startMatch() {
  //   this.client.publish({ destination: '/app/ready' });
  // }

  disconnect() {
    if (this.client && this.client.active) {
      this.client.deactivate().then(() => {
        console.log('🔌 WebSocket отключен');
        this.lobby$.next([])
      });
    }
  }

}
