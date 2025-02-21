import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {WebSocketService} from '../../services/web-socket.service';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/http.authService';
import {JsonPipe} from '@angular/common';
import {ButtonComponent} from '../../componets/globals/button/button.component';

@Component({
    selector: 'app-lobby-page',
    imports: [FormsModule, JsonPipe, ButtonComponent],
    templateUrl: './lobby-page.component.html',
    styleUrl: './lobby-page.component.css'
})
export class LobbyPageComponent implements OnInit{
  format:string=''
  team1: any[] = [];
  team2: any[] = [];
  lobby: any = null;
  matchStatus: string = '';
  lobbyId!: string;
  me:any
  rStatus:WritableSignal<boolean>=signal<boolean>(false);

  ngOnInit(): void {
    this.lobbyId = this.route.snapshot.paramMap.get('id')!;
    this.wsService.connect(this.lobbyId)
    this.me=this.profileService.getUser()

    // Либо использовать подписку, если id может измениться без перезагрузки компонента:
    // this.route.paramMap.subscribe(params => {
    //   this.itemId = params.get('id')!;
    // });
  }

  constructor(private wsService: WebSocketService,private route: ActivatedRoute, private profileService:AuthService) {
    this.wsService.players$.subscribe((lobby:any) => {
      console.log("ne robit",lobby)
      console.log("ne robit",lobby.team1)
      this.lobby=lobby
      this.team1=lobby.team1
      this.team2=lobby.team2

    });
    this.wsService.matchStatus$.subscribe(status => this.matchStatus = status);

  }

  changeStatus(status:any){
    console.log(status,"_________")
    console.log(!status,"_________")
    this.wsService.setReady(this.lobbyId,this.profileService.getUser().steamId,!status)
  }
  join() {
    console.log(this.format, this.lobbyId,this.profileService.getUser().steamId)
    this.wsService.joinTeam(this.lobbyId,this.profileService.getUser().steamId,this.format)
  }

  start() {
    this.wsService.startMatch();
  }


  connectToServer(serverIP:string, serverPort:string) {
    const steamUrl = `steam://connect/${serverIP}:${serverPort}`;
    window.location.href = steamUrl;
  }
}
