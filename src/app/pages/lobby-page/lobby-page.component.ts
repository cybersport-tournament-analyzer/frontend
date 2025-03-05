import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {WebSocketService} from '../../services/web-socket.service';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/http.authService';
import {JsonPipe} from '@angular/common';
import {ButtonComponent} from '../../componets/globals/button/button.component';
import {UserDto} from '../../interfaces/user-dto';
import {LobbyDto} from '../../interfaces/lobby-dto';

@Component({
  selector: 'app-lobby-page',
  imports: [FormsModule, JsonPipe, ButtonComponent],
  templateUrl: './lobby-page.component.html',
  standalone: true,
  styleUrl: './lobby-page.component.css'
})
export class LobbyPageComponent implements OnInit{
  format:string=''
  team1: any[] = [];
  team2: any[] = [];
  lobby: LobbyDto| null = null;
  timer:any|null = null ;
  matchStatus: string = '';
  lobbyId!: string;
  me:any
  user:UserDto|null=null
  rStatus:WritableSignal<boolean>=signal<boolean>(false);
  stage: string = "pickBanStage";
  stat:any=null;

  ngOnInit(): void {
    this.lobbyId = this.route.snapshot.paramMap.get('id')!;
    this.wsService.connectToLobby(this.lobbyId)
    this.me=this.profileService.getUser()
    this.profileService.getUser().subscribe((user:UserDto)=>{this.user = user})
    this.wsService.match$.subscribe((stat:any)=>{
      console.log(stat)
      console.log("!!!!!!!!!")
      this.stat = stat
    })

    // Либо использовать подписку, если id может измениться без перезагрузки компонента:
    // this.route.paramMap.subscribe(params => {
    //   this.itemId = params.get('id')!;
    // });
  }

  showToast:boolean = false
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast = true;
      // Скрываем уведомление через 2.5 секунды
      setTimeout(() => {
        this.showToast = false;
      }, 2500);
    }).catch(err => {
      console.error('Ошибка копирования:', err);
    });
  }
  constructor(private wsService: WebSocketService,private route: ActivatedRoute, private profileService:AuthService) {
    this.wsService.lobby$.subscribe((lobby:any) => {
      console.log("ne robit",lobby)
      console.log("ne robit",lobby.team1)
      this.lobby=lobby
      this.team1=lobby.team1
      this.team2=lobby.team2
      if (lobby.link != null){
        this.stage =  "statStage"

        this.startStatStage();
      }


    });
    this.wsService.timer$.subscribe(timer=>{this.timer=timer})
    // this.wsService.matchStatus$.subscribe(status => this.matchStatus = status);

  }

  startStatStage(){
    console.log("start Stat Stage")
    this.wsService.connectToMatch(this.lobbyId)

  }
  changeStatus(status:any){
    console.log(status,"_________")
    console.log(!status,"_________")
    this.wsService.setReady(this.lobbyId,this.user?.steamId,!status)
  }
  join() {
    // console.log(this.format, this.lobbyId,this.profileService.getUser().steamId)
    this.wsService.joinTeam(this.lobbyId,this.user?.steamId,this.format)
  }

  start() {
    this.wsService.startMatch();
  }
  actionByMap( map:string) {
    const message:{lobbyId?:string,steamId?:string,action?:string,map?:string,side?:string}={
    };
    message.steamId = this.user?.steamId!;
    message.action = this.lobby?.pickBanSession?.nextActionType;

    message.lobbyId = this.lobby!.id;
    if (this.lobby?.pickBanSession?.nextActionType == ('BAN' || 'PICK')){
      message.map = map;

    }else{
      message.side =map ;
    }


    this.wsService.pickBan(message)
  }


  connectToServer(serverIP:string, serverPort:string) {
    const steamUrl = `steam://connect/${serverIP}:${serverPort}`;
    window.location.href = steamUrl;
  }
  get isMatchStarted(): boolean {
    return this.stat.match.events?.some((element:any) => element.event === "match_started");
  }
  get isServerBooting(): boolean {
    return this.stat.match.events?.some((element:any) => element.event === "server_booting");
  }
  get isMapLoading(): boolean {
    return this.stat.match.events?.some((element:any) => element.event === "map_loading");
  }
  get isServerReady(): boolean {
    return this.stat.match.events.some((element:any) => element.event === "server_ready_for_players");
  }

  protected readonly Object = Object;
}
