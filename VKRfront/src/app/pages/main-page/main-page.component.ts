import {Component, signal, WritableSignal} from '@angular/core';
import {AuthService} from '../../services/http.authService';
import {WebSocketService} from '../../services/web-socket.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {UserDto} from '../../interfaces/user-dto';


@Component({
  selector: 'app-main-page',
  imports: [
    JsonPipe,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  name = "Tom";
  lobbys$!:Observable<any[]> ;
  lobby:WritableSignal<any[]>=signal([]);
  user:WritableSignal<UserDto|null>=signal(null)

  constructor(private authService:AuthService, private socketService:WebSocketService) {
    this.lobbys$=this.socketService.getLobbys();
    // this.authService.getInfo().subscribe(({attributes}:any)=>{
    //   console.log("At",attributes)
    //   this.user.set(this.authService.getUser())
    // })

      // (async () => {
      //   const userData = await this.authService.getUser();
      //   this.user.set(userData); // здесь уже обычный объект
      //   console.log("User:", this.user());
      // })();
    this.authService.getUser().subscribe(userData => this.user.set(userData));
    console.log("end const")

  }

  gatToken(){
    return this.authService.getJwtToken()
  }

  createLobby() {
    console.log(this.authService.getUser())
    this.socketService.createLobby(this.user()?.steamId||"hui","1x1")
      .subscribe((data:any)=>{
        console.log(data)
         // @ts-ignore
        this.lobby.set(this.lobby().push(data['lobbyId']))
        })
  }
}
