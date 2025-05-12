import {Component, computed, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {WebSocketService} from '../../services/web-socket.service';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {AuthService} from '../../services/http.authService';
import {JsonPipe, NgClass} from '@angular/common';
import {ButtonComponent} from '../../componets/globals/button/button.component';
import {UserDto} from '../../interfaces/user-dto';
import {LobbyDto} from '../../interfaces/lobby-dto';
import {
  CustomCellDefDirective,
  CustomColumnDirective,
  CustomHeaderCellDefDirective
} from '../../features/table/custom-column.directive';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {InfoMatchBlockComponent} from '../../componets/info-match-block/info-match-block.component';
import {TabDirective} from '../../features/tabs/tab.directive';
import {TableComponent} from '../../features/table/table.component';
import {TabsComponent} from '../../features/tabs/tabs.component';
import {StatsResultDirective} from '../../directives/stats-result.directive';
import {StarDirective} from '../../directives/star.directive';
import {map, timer, window} from 'rxjs';
import {state} from '@angular/animations';
import {SpinnerComponent} from '../../features/spinner/spinner.component';

@Component({
  selector: 'app-lobby-page',
  imports: [FormsModule, JsonPipe, ButtonComponent, CustomCellDefDirective, CustomColumnDirective, CustomHeaderCellDefDirective, ImgURLPipe, InfoMatchBlockComponent, TabDirective, TableComponent, TabsComponent, NgClass, StatsResultDirective, StarDirective, SpinnerComponent],
  templateUrl: './lobby-page.component.html',
  standalone: true,
  styleUrl: './lobby-page.component.css'
})
export class LobbyPageComponent implements OnInit, OnDestroy{
  stages:any[]=['Общая информация','Статистика']
  selectedStage:string='Общая информация'
  format:string=''
  team1: any[] = [];
  team2: any[] = [];
  lobby: any= signal(null) ;
  timer:any|null = null ;
  matchStatus: string = '';
  lobbyId!: string;
  me:any
  user:UserDto|null=null
  rStatus:WritableSignal<boolean>=signal<boolean>(false);
  stage: string = "pickBanStage";
  stat:any=signal(null);


  public baseStats=[
    {
      username:'Username',

      role:'SNIPER',
      kill:25,
      death:14,
      assist:6,
      damage: 2857,
      ADR:123,
      HLTV: 1.55,
      KAST:95,
    },
    {
      username:'Username',
      role:'SNIPER',
      kill:24,
      death:14,
      assist:6,
      damage: 2857,
      ADR:82,
      HLTV: 1.55,
      KAST:95,
    },
    {
      username:'Username',
      role:'SNIPER',
      kill:23,
      death:14,
      assist:6,
      damage: 2857,
      ADR:86,
      HLTV: 1.55,
      KAST:95,
    },
    {
      username:'Username',
      role:'SNIPER',
      kill:22,
      death:18,
      assist:6,
      damage: 2857,
      ADR:50,
      HLTV: 1.55,
      KAST:95,
    },
    {
      username:'Username',
      role:'SNIPER',
      kill:21,
      death:18,
      assist:6,
      damage: 2857,
      ADR:38,
      HLTV: 1.55,
      KAST:95,
    }
  ]
  ngOnInit(): void {
    this.lobbyId = this.route.snapshot.paramMap.get('id')!;
    this.wsService.connectToLobby(this.lobbyId)
    this.me=this.profileService.getUser()
    console.log("do profileService in LobbyPageComponent ")
    this.profileService.getUser().subscribe((user:UserDto)=>{this.user = user})
    console.log("after profileService in LobbyPageComponent ")
    this.wsService.match$.subscribe((stat:any)=>{
      console.log(stat)
      console.log("!!!!!!!!!")
      console.log(stat.match)
      // this.stat.set({
      //   ...structuredClone(stat.match),
      //   team1Name:stat.team1Name,
      //   team2Name:stat.team2Name
      // })


    })
    this.wsService.lobby$.subscribe((lobby:any) => {
      console.log("ne robit",lobby)
      console.log("ne robit",lobby.team1)
      this.lobby.set(lobby)
      console.log("УСТАНАВЛИВАЕМ ЕБАННЫЙ ЛОБИ")
      console.log(this.lobby())
      this.team1=lobby.team1
      this.team2=lobby.team2
      // this.stat = {
      //   ...lobby.matches,
      //   team1Name:lobby.team1Name,
      //   team2Name:lobby.team2Name
      // }
      this.stat.set({
        ...structuredClone(lobby.matches),
        team1Name:lobby.team1Name,
        team2Name:lobby.team2Name
      })
      if (lobby.link != null){
        this.stage =  "statStage"

        this.startStatStage();
      }


    });
    this.wsService.timer$.subscribe(timer=>{this.timer=timer})
    // this.wsService.matchStatus$.subscribe(status => this.matchStatus = status);

    // Либо использовать подписку, если id может измениться без перезагрузки компонента:
    // this.route.paramMap.subscribe(params => {
    //   this.itemId = params.get('id')!;
    // });
  }

  showToast:boolean = false
  // copyToClipboard(text: string) {
  //   console.log("aaa" ,text)
  //   navigator.clipboard.writeText(text.split('+')[1]).then(() => {
  //     this.showToast = true;
  //     // Скрываем уведомление через 2.5 секунды
  //     setTimeout(() => {
  //       this.showToast = false;
  //     }, 2500);
  //   }).catch(err => {
  //     console.error('Ошибка копирования:', err);
  //   });
  // }

  copyToClipboard(text: string) {
    // // Проверка наличия '+'
    // const parts = text.split('+');
    // if (parts.length < 2) return;
    //
    // const textToCopy = parts[1];
    //
    // // Fallback-метод
    // const legacyCopy = () => {
    //   const textarea = document.createElement('textarea');
    //   textarea.value = textToCopy;
    //   document.body.appendChild(textarea);
    //   textarea.select();
    //   document.execCommand('copy');
    //   document.body.removeChild(textarea);
    // };
    //
    // // Исправленная проверка безопасного контекста
    // const isSecure = window.location.protocol === 'https:' ||
    //   window.location.hostname === 'localhost' ||
    //   window.location.hostname === '127.0.0.1';
    //
    // if (!navigator.clipboard || !isSecure) {
    //   legacyCopy();
    // } else {
    //   navigator.clipboard.writeText(textToCopy)
    //     .catch(() => legacyCopy());
    // }
    //
    // this.showToast = true;
    // setTimeout(() => { this.showToast = false; }, 2500);
  }
  constructor(private wsService: WebSocketService,private route: ActivatedRoute, private profileService:AuthService, private router:Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.wsService.disconnect();
      }
    });

  }

  startStatStage(){
    console.log("start Stat Stage")
    this.wsService.connectToMatch(this.lobbyId)

  }
  changeStatus(status:any){
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
    message.action = this.lobby()?.pickBanSession?.nextActionType;

    message.lobbyId = this.lobby()!.id;
    if (this.lobby?.pickBanSession?.nextActionType == ('BAN' || 'PICK')){
      message.map = map;

    }else{
      message.side =map ;
    }


    this.wsService.pickBan(message)
  }


  // connectToServer(serverIP:string, serverPort:string) {
  //   const steamUrl = `steam://connect/${serverIP}:${serverPort}`;
  //   window.location.href = steamUrl;
  // }
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

  selectState(state: any) {
    this.selectedStage=state
  }
  public test:any={"id":"6532319b-a979-44cf-955e-4877ee1d7746","tournamentId":"5c1ead96-ad6e-44f1-b8d9-e4e1641514e5","mode":"1vs1","pickBanSession":{
    "maps": ["AIM_Redline",
      "AIM_Fist",
      "AIM_Nuke_hall",
      "AIM_Map",
      "AIM_Vertigo",
      "AIM_Case"],
      "sides":["T","CT"],"actionsLogs":[{"team":"rodion226","action":"BAN","mapOrSide":"AIM_Map"},{"team":"vladibaby","action":"BAN","mapOrSide":"AIM_Redline"},
        {"team":"rodion226","action":"BAN","mapOrSide":"AIM_Nuke_hall"},{"team":"vladibaby","action":"BAN","mapOrSide":"AIM_Fake"},{"team":"rodion226","action":"BAN","mapOrSide":"AIM_Fist"},
        {"team":"vladibaby","action":"BAN","mapOrSide":"AIM_Vertigo"},{"team":"rodion226","action":"PICK_SIDE","mapOrSide":"CT"}],"pickedMaps":["AIM_Case"],"sideSelections":[{"side":"CT","team":"rodion226"}],
      "format":"bo1","lobbyId":"6532319b-a979-44cf-955e-4877ee1d7746","currentTeamTurn":null,"nextActionType":"PICK_SIDE","completed":true},"format":"bo1","link":null,
    "admin":{"steam_id_64":"76561198274098341","team":"spectator","nickname_override":"observer"},
    "team1":{"1":{"id":"85338c57-f99f-4408-a69e-323fce158703","playerSteamId":"76561198155737420","inGameRoles":null,"ready":true,"captain":true,"playerUsername":"Король гамадрило"}},
    "team2":{"2":{"id":"feea0cac-a08b-49cc-9c79-0f6e6838e3b3","playerSteamId":"76561198295068808","inGameRoles":null,"ready":true,"captain":true,"playerUsername":"WhatIsLove"}},
    "team1Score":0,"team2Score":0,"team1Name":"rodion226","team2Name":"vladibaby","team1flag":"RU","team2flag":"RU","currentMapNumber":0,"matches":[]}

  ngOnDestroy(): void {
    this.wsService.disconnect()
    this.lobby.set(null)
  }
// {"id":"6532319b-a979-44cf-955e-4877ee1d7746",
//   "tournamentId":"5c1ead96-ad6e-44f1-b8d9-e4e1641514e5",
//   "mode":"1vs1",
//   "pickBanSession":{
//   "maps":null,
//     "sides":["T","CT"],
//     "actionsLogs":[
//       {"team":"rodion226","action":"BAN","mapOrSide":"AIM_Map"},
//       {"team":"vladibaby","action":"BAN","mapOrSide":"AIM_Redline"},
//       {"team":"rodion226","action":"BAN","mapOrSide":"AIM_Nuke_hall"},
//       {"team":"vladibaby","action":"BAN","mapOrSide":"AIM_Fake"},
//       {"team":"rodion226","action":"BAN","mapOrSide":"AIM_Fist"},
//       {"team":"vladibaby","action":"BAN","mapOrSide":"AIM_Vertigo"},
//       {"team":"rodion226","action":"PICK_SIDE","mapOrSide":"CT"}],
//     "pickedMaps":["AIM_Case"],
//     "sideSelections":[{"side":"CT","team":"rodion226"}],
//     "format":"bo1",
//     "lobbyId":"6532319b-a979-44cf-955e-4877ee1d7746",
//     "currentTeamTurn":null,"nextActionType":null,"completed":true},"format":"bo1","link":null,"admin":{"steam_id_64":"76561198274098341","team":"spectator","nickname_override":"observer"},"team1":{"1":{"id":"85338c57-f99f-4408-a69e-323fce158703","playerSteamId":"76561198155737420","inGameRoles":null,"ready":true,"captain":true,"playerUsername":"Король гамадрило"}},"team2":{"2":{"id":"feea0cac-a08b-49cc-9c79-0f6e6838e3b3","playerSteamId":"76561198295068808","inGameRoles":null,"ready":true,"captain":true,"playerUsername":"WhatIsLove"}},"team1Score":0,"team2Score":0,"team1Name":"rodion226","team2Name":"vladibaby","team1flag":"RU","team2flag":"RU","currentMapNumber":0,"matches":[]}

  protected readonly Number = Number;
}
