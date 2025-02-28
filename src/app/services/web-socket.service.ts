import { Injectable } from '@angular/core';
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
  public players$ = new BehaviorSubject<string[]>([]);
  // public matchStatus$ = new BehaviorSubject<string>('');
  public timer$ = new BehaviorSubject<string>('');
  public me:any = null

  constructor(private http: HttpClient) {































    // let ws = new SockJS('http://localhost:8081/ws');
    // this.client = Stomp.over(ws);
    // this.client = new SockJS('http://localhost:8081/ws');
    // this.client = new Client({
    //   webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
    //   debug: (msg) => console.log(msg),
    //   reconnectDelay: 5000,
    // });
    // console.log(this.client)

      // this.client.connect({}, (frame: any) => {
      //   // console.log('ME Connected: ' + frame);
      //   this.client.subscribe(`/topic/lobby`, (message: any) => {
      //     // console.log("GGGG"+JSON.parse(messageOutput.body));
      //     // Здесь добавьте логику для обработки полученных сообщений
      //     console.log("before")
      //     // this.players$.next(JSON.parse(message.body));
      //     console.log("ssss",message.body)
      //     // showMessageOutput(JSON.parse(messageOutput.body));
      //   });
      // });



      // this.client.subscribe('/topic/lobby', (message: Message) => {
      //   console.log("before")
      //   this.players$.next(JSON.parse(message.body));
      //   console.log("ssss",message.body)
      // });

      //   this.client.subscribe('/topic/match', (message: Message) => {
      //     this.matchStatus$.next(message.body);
      //   });
      // };

      // this.client.activate();
    }

  getClient(){
    return this.client
  }
  createLobby(id:any,mode:string):Observable<boolean> {
    console.log("in websocket service")
    return this.http.post<any>(`${environment.matchSource}/create`, {
      'steamId': id,
      'mode':mode,
      'format' : 'bo5'
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

  connect(lobbyId:string){
    console.log('🔄 Инициализация WebSocket...');

    this.client = new Client({
      webSocketFactory: () => new SockJS(`${environment.matchSource}/ws`),
      debug: (msg) => console.log('STOMP DEBUG:', msg),
      reconnectDelay: 5000,
    });

    console.log('✅ WebSocket клиент создан:', this.client);
    console.log("aaaaa",this.client)
    this.client.onConnect = () =>
    {
      console.log('🟢 WebSocket подключен!');

      this.client.subscribe('/topic/lobby/'+lobbyId, (message: Message) => {
        console.log('🎮 Обновление лобби:');
        console.log('🎮 Обновление лобби:', message.body);
        this.players$.next(JSON.parse(message.body));

        console.log(this.players$,'ZZVZVZVZVZVZV')
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


}
