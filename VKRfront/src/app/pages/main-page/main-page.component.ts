import {Component, signal, WritableSignal} from '@angular/core';
import {AuthService} from '../../services/http.authService';
import {WebSocketService} from '../../services/web-socket.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  name = "Tom";
  lobbys$!:Observable<any[]> ;
  lobby:WritableSignal<any[]>=signal([]);
  user:any=null

  constructor(private authService:AuthService, private socketService:WebSocketService) {
    this.lobbys$=this.socketService.getLobbys()
    this.authService.getInfo().subscribe()
    this.user=this.authService.getUser();
  }

  gatToken(){
    return this.authService.getJwtToken()
  }

  createLobby() {
    console.log(this.authService.getUser())
    this.socketService.createLobby(this.authService.getUser().steamId||"hui","1x1")
      .subscribe((data:any)=>{
        console.log(data)
         // @ts-ignore
        this.lobby.set(this.lobby().push(data['lobbyId']))
        })
  }
}
