import {Component, OnChanges, OnInit, Signal, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {TagComponent} from '../../componets/globals/tag/tag.component';
import {TabsComponent} from '../../features/tabs/tabs.component';
import {StageComponent} from '../../componets/stage/stage.component';
import {TabDirective} from '../../features/tabs/tab.directive';
import {DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {InfoMatchBlockComponent} from '../../componets/info-match-block/info-match-block.component';
import {TableComponent} from '../../features/table/table.component';
import {
  CustomCellDefDirective,
  CustomColumnDirective,
  CustomHeaderCellDefDirective
} from '../../features/table/custom-column.directive';
import {StarDirective} from '../../directives/star.directive';
import {WinnerTeamDirective} from '../../features/tournament-bracket/directive/winner-team.directive';
import {PrizeDirective} from '../../directives/prize.directive';
import {StatsResultDirective} from '../../directives/stats-result.directive';
import {state} from '@angular/animations';
import {MatchService} from '../../services/match/match-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonComponent} from '../../componets/globals/button/button.component';
import {InfoCardComponent} from '../../componets/info-card/info-card.component';
import {SpinnerComponent} from '../../features/spinner/spinner.component';
import {ComparePlayersComponent} from '../../features/compare-players/compare-players.component';
import {IdToNicknamePipe} from '../../pipes/id-to-nickname.pipe';
import {
  InfoSeriesBlockWithCompareComponent
} from '../../componets/info-series-block-with-compare/info-series-block-with-compare.component';
import {StatsService} from '../../services/stats.service';
import {GameStatsComponent} from '../../componets/game-stats/game-stats.component';
import {count} from 'rxjs';


interface PlayerStats {
  playerSteamId: string;
  playerUsername:string
  // Include other properties as needed
}

interface GameData {
  team1: {
    [key: string]: PlayerStats;
  };
  team2: {
    [key: string]: PlayerStats;
  };
  matches:any[]
  // Add team2 and other properties if necessary
}
@Component({
  selector: 'app-match-page',
  imports: [
    ImgURLPipe,
    TagComponent,
    TabsComponent,
    StageComponent,
    TabDirective,
    JsonPipe,
    InfoMatchBlockComponent,
    NgClass,
    TableComponent,
    CustomColumnDirective,
    CustomCellDefDirective,
    CustomHeaderCellDefDirective,
    StarDirective,
    WinnerTeamDirective,
    PrizeDirective,
    StatsResultDirective,
    ButtonComponent,
    InfoCardComponent,
    SpinnerComponent,
    ComparePlayersComponent,
    NgIf,
    NgForOf,
    IdToNicknamePipe,
    InfoSeriesBlockWithCompareComponent,
    DecimalPipe,
    GameStatsComponent
  ],
  templateUrl: './match-page.component.html',
  standalone: true,
  styleUrl: './match-page.component.css'
})
export class MatchPageComponent implements OnInit,OnChanges{
  protected match:any={
    team1:[
      {name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},
      {name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},
      {name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},
      {name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},
      {name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},
    ],
    team2:[{name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},
      {name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},
      {name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},
      {name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},
      {name:'Username',elo:100, imgUrl:null,stats:"1/2/3"},],
    score1:2,
    score2:0,
    status:'Завершен',
    date: '22 марта 2025',
    matches:[
      {},
      {},
      {}
    ]
  }
  stages:any[]=['Общая информация','Статистика']
  selectedStage:string='Общая информация'

  expendedStatsIsOpen:boolean = false
  selectState(state: any) {
    this.selectedStage=state

  }
  // public baseStats=[
  //   {
  //     username:'Username',
  //
  //     role:'SNIPER',
  //     kill:25,
  //     death:14,
  //     assist:6,
  //     damage: 2857,
  //     ADR:123,
  //     HLTV: 1.55,
  //     KAST:95,
  //   },
  //   {
  //     username:'Username',
  //     role:'SNIPER',
  //     kill:24,
  //     death:14,
  //     assist:6,
  //     damage: 2857,
  //     ADR:82,
  //     HLTV: 1.55,
  //     KAST:95,
  //   },
  //   {
  //     username:'Username',
  //     role:'SNIPER',
  //     kill:23,
  //     death:14,
  //     assist:6,
  //     damage: 2857,
  //     ADR:86,
  //     HLTV: 1.55,
  //     KAST:95,
  //   },
  //   {
  //     username:'Username',
  //     role:'SNIPER',
  //     kill:22,
  //     death:18,
  //     assist:6,
  //     damage: 2857,
  //     ADR:50,
  //     HLTV: 1.55,
  //     KAST:95,
  //   },
  //   {
  //     username:'Username',
  //     role:'SNIPER',
  //     kill:21,
  //     death:18,
  //     assist:6,
  //     damage: 2857,
  //     ADR:38,
  //     HLTV: 1.55,
  //     KAST:95,
  //   }
  // ]
  playerIds: string[] = [];
  matrixData: any[] = [];
  // config: any = {
  //   "76561198155737420": 'FischeR_ts33', "76561198295068808": 'lolpik33', "3": 'swoow1', "4": 'sh1ro', "5": 'dexie',
  //   "6": 'why_n0t', "7": 'nex1', "8": 'relo', "9": 'somuL', "10": 'plaaaayer',
  // };
  config:any={}
  SERIES_ID: string;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router,
    private statsService: StatsService
  ) {
    this.SERIES_ID = this.route.snapshot.paramMap.get('id')!;
  }

  seriesData = signal<any>(null);
  matches = signal<any>(null);
  duelsBySeriesOrder = signal<any[]>([]);
  baseStatsInMatches = signal<any>([]);
  comparePlayers = signal<any>(null);
  gameStatsSelectedUser = signal<any | null>(null);

  ngOnInit(): void {
    this.matchService.getInfoSeries(this.SERIES_ID).subscribe({
      next: (data: any) => {
        if (data) {
          this.seriesData.set({ ...data, format: data.pickBanSession?.format });
          this.matches.set(Object.values(data.matches));
          this.baseStatsInMatches.set(this.preparareTeamBaseStat(this.matches()));
          this.prepareConfig(data)
          this.prepareGameStatsPlayersByMatch(data);
          this.loadAllDuels(Object.values(data.matches).length);

        }
      },
      error: () => {
        this.router.navigate(['/home']);
      },
    });
  }
  matrixDuels:WritableSignal<any>=signal([])

  loadAllDuels(matchCount: number) {
    const duelRequests = [];

    for (let i = 0; i < matchCount; i++) {
      duelRequests.push(this.statsService.getDuelsByOrder(this.SERIES_ID, i));
    }

    Promise.all(duelRequests.map(req => req.toPromise())).then((results: any[]) => {
      this.duelsBySeriesOrder.set(results);
      const allDuels = results.flat(); // Собираем все дуэли в один массив
      console.log("allDuels")
      console.log(allDuels)

      const duels = allDuels.map(item=> {return item.duels} )
      console.log(duels)
      for (let i = 0; i < duels.length; i++) {
        this.buildMatrixFromDuels(duels[i]);
      }
      // this.buildMatrixFromDuels(duels[0]);
      console.log("this.matrixData")
      console.log(this.matrixDuels())

    });
  }
  prepareConfig(data:GameData){
    console.log("prepareConfig")
    const teamConfig: { [key: string]: string } = {};

    for (const datum of Object.values(data.team1)) {
      if (datum.playerSteamId && datum.playerUsername) {
        teamConfig[datum.playerSteamId] = datum.playerUsername;
      }
    }
    for (const datum of Object.values(data.team2)) {
      if (datum.playerSteamId && datum.playerUsername) {
        teamConfig[datum.playerSteamId] = datum.playerUsername;
      }
    }

    this.config = {
      ...this.config,
      ...teamConfig,
    };


  }

  buildMatrixFromDuels(duels: any[]){
    const team1Ids = Array.from(new Set(duels.map(d => d.player1Id.toString())));
    const team2Ids = Array.from(new Set(duels.map(d => d.player2Id.toString())));
    this.playerIds = [...team1Ids, ...team2Ids];

    this.matrixData = this.playerIds.map(killerId => {
      const row: any = {
        killerId
      };

      this.playerIds.forEach(victimId => {
        if (killerId === victimId) {
          row[victimId] = null;
          return;
        }

        const duel = duels.find(d =>
          (d.player1Id.toString() === killerId && d.player2Id.toString() === victimId) ||
          (d.player1Id.toString() === victimId && d.player2Id.toString() === killerId)
        );

        if (!duel) {
          row[victimId] = null;
          return;
        }

        const isKillerPlayer1 = duel.player1Id.toString() === killerId;
        const kills = isKillerPlayer1 ? duel.player1Kills : duel.player2Kills;
        const percent = isKillerPlayer1 ? duel.player1KillsPercent : duel.player2KillsPercent;

        row[victimId] = { kills, percent };
      });

      return row;
    });
    this.matrixDuels().push(this.matrixData)

  }




  // buildMatrixFromDuels(duels: any[]) {
  //   const team1Ids = Array.from(new Set(duels.map(d => d.player1Id?.toString())));
  //   const team2Ids = Array.from(new Set(duels.map(d => d.player2Id?.toString())));
  //   this.playerIds = [...new Set([...team1Ids, ...team2Ids])];
  //   console.log("team1Ids",duels,team2Ids)
  //
  //   this.matrixData = this.playerIds.map(killerId => {
  //     const row: any = { killerId };
  //
  //     this.playerIds.forEach(victimId => {
  //       if (killerId === victimId) {
  //         row[victimId] = null;
  //         return;
  //       }
  //
  //       const duel = duels.find(d =>
  //         (d.player1Id.toString() === killerId && d.player2Id.toString() === victimId) ||
  //         (d.player1Id.toString() === victimId && d.player2Id.toString() === killerId)
  //       );
  //
  //       if (!duel) {
  //         row[victimId] = null;
  //         return;
  //       }
  //
  //       const isKillerPlayer1 = duel.player1Id.toString() === killerId;
  //       const kills = isKillerPlayer1 ? duel.player1Kills : duel.player2Kills;
  //       const percent = isKillerPlayer1 ? duel.player1KillsPercent : duel.player2KillsPercent;
  //
  //       row[victimId] = { kills, percent };
  //     });
  //
  //     return row;
  //   });
  // }





  gameStats:WritableSignal<any[]> =signal<any[]>([])

  prepareGameStatsPlayersByMatch(data: GameData) {
    console.log("prepareGameStatsPlayersByMatch");
    console.log(Object.values(data.matches).length)
    for (let i = 0; i < Object.values(data.matches).length ; i++) {
      this.gameStats().push([])
      for (const datum of Object.values(data.team1)) {
        // console.log(datum.playerSteamId , this.SERIES_ID); // No error now
        this.statsService.getGameStatsByMatch(datum.playerSteamId,this.SERIES_ID,i).subscribe((data:any)=>{

          if(data){
            // console.log(i, this.gameStats())
            this.gameStats()[i].push(data)
            // console.log(this.userGameStats())
          }
          console.log("suka!@!#!##!#!#!#!#@#!#$" , i )


        })
      }

      for (const datum of Object.values(data.team2)) {
        // console.log(datum.playerSteamId , this.SERIES_ID); // No error now
        this.statsService.getGameStatsByMatch(datum.playerSteamId,this.SERIES_ID,i).subscribe((data:any)=>{
          if(data){
            this.gameStats()[i].push(
              data
            )
          }
          console.log("!@!#!##!#!#!#!#@#!#$" , i )

        })
      }

    }


  }


  preparareTeamBaseStat(matches :any[]): any{

    const team1Name =this.seriesData().team1Name
    const team2Name =this.seriesData().team2Name
    const pullTeam1 = Object.values(this.seriesData().team1).map((item:any)=>{ return item.playerUsername})
    const pullTeam2 = Object.values(this.seriesData().team2).map((item:any)=>{ return item.playerUsername})
    console.log(this.seriesData())
    console.log("preparareTeamBaseStat")
    console.log(matches)
    const statTeam1InAllMatches= matches!.map((item:any)=>{
      return  item.match.players.filter((player:any)=>
        pullTeam1.includes(player.nickname_override)
      )

    })
    console.log("statTeam1InAllMatches")
    console.log(statTeam1InAllMatches)
    const statTeam2InAllMatches= matches!.map((item:any)=>{
      return  item.match.players.filter((player:any)=>
        pullTeam2.includes(player.nickname_override)
      )

    })
    console.log("statTeam2InAllMatches")
    console.log(statTeam2InAllMatches)
    const statTeamsInMatches=[]
    for (let i = 0; i < matches.length; i++) {
      statTeamsInMatches.push(
        {team1:statTeam1InAllMatches[i],
          team2:statTeam2InAllMatches[i],
          team1Score: matches[i].match.team1.name == team1Name? matches[i].match.team1.stats.score : matches[i].match.team2.stats.score,
          team2Score: matches[i].match.team2.name == team2Name? matches[i].match.team2.stats.score : matches[i].match.team1.stats.score,
        }
      )
    }
    return statTeamsInMatches
  }


  protected readonly Object = Object;

  public pickBanSessionIsOpen:boolean = false

  openPickBanSession() {
    this.pickBanSessionIsOpen = !this.pickBanSessionIsOpen
  }
  calculateContainerHeight(): number {
    const cardHeight = 65;
    const gap = 12;
    const padding = 8
    const count = this.seriesData().pickBanSession.actionsLogs.length;

    if (count === 0) return 0;
    return (cardHeight * count) + (gap * (count - 1)) + padding*2;
  }


  openExtendedStats() {
    this.expendedStatsIsOpen= !this.expendedStatsIsOpen
  }


  testDuels = [
    { player1Id: "1", player2Id: "6", nickname1: 'FischeR_ts33', nickname2: 'why_n0t', player1Kills: 3, player2Kills: 2, player1KillsPercent: 60, player2KillsPercent: 40, index: 1 },
    { player1Id: "1", player2Id: "7", nickname1: 'FischeR_ts33', nickname2: 'nex1', player1Kills: 1, player2Kills: 4, player1KillsPercent: 20, player2KillsPercent: 80, index: 2 },
    { player1Id: "1", player2Id: "8", nickname1: 'FischeR_ts33', nickname2: 'relo', player1Kills: 5, player2Kills: 3, player1KillsPercent: 63, player2KillsPercent: 37, index: 3 },
    { player1Id: "1", player2Id: "9", nickname1: 'FischeR_ts33', nickname2: 'somuL', player1Kills: 2, player2Kills: 2, player1KillsPercent: 50, player2KillsPercent: 50, index: 4 },
    { player1Id: "1", player2Id: "10", nickname1: 'FischeR_ts33', nickname2: 'plaaaayer', player1Kills: 3, player2Kills: 4, player1KillsPercent: 43, player2KillsPercent: 57, index: 5 },

    { player1Id: "2", player2Id: "6", nickname1: 'lolpik33', nickname2: 'why_n0t', player1Kills: 4, player2Kills: 1, player1KillsPercent: 80, player2KillsPercent: 20, index: 6 },
    { player1Id: "2", player2Id: "7", nickname1: 'lolpik33', nickname2: 'nex1', player1Kills: 0, player2Kills: 5, player1KillsPercent: 0, player2KillsPercent: 100, index: 7 },
    { player1Id: "2", player2Id: "8", nickname1: 'lolpik33', nickname2: 'relo', player1Kills: 2, player2Kills: 2, player1KillsPercent: 50, player2KillsPercent: 50, index: 8 },
    { player1Id: "2", player2Id: "9", nickname1: 'lolpik33', nickname2: 'somuL', player1Kills: 3, player2Kills: 3, player1KillsPercent: 50, player2KillsPercent: 50, index: 9 },
    { player1Id: "2", player2Id: "10", nickname1: 'lolpik33', nickname2: 'plaaaayer', player1Kills: 5, player2Kills: 0, player1KillsPercent: 100, player2KillsPercent: 0, index: 10 },

    { player1Id: "3", player2Id: "6", nickname1: 'swoow1', nickname2: 'why_n0t', player1Kills: 2, player2Kills: 3, player1KillsPercent: 40, player2KillsPercent: 60, index: 11 },
    { player1Id: "3", player2Id: "7", nickname1: 'swoow1', nickname2: 'nex1', player1Kills: 1, player2Kills: 1, player1KillsPercent: 50, player2KillsPercent: 50, index: 12 },
    { player1Id: "3", player2Id: "8", nickname1: 'swoow1', nickname2: 'relo', player1Kills: 4, player2Kills: 1, player1KillsPercent: 80, player2KillsPercent: 20, index: 13 },
    { player1Id: "3", player2Id: "9", nickname1: 'swoow1', nickname2: 'somuL', player1Kills: 3, player2Kills: 3, player1KillsPercent: 50, player2KillsPercent: 50, index: 14 },
    { player1Id: "3", player2Id: "10", nickname1: 'swoow1', nickname2: 'plaaaayer', player1Kills: 5, player2Kills: 2, player1KillsPercent: 71, player2KillsPercent: 29, index: 15 },

    { player1Id: "4", player2Id: "6", nickname1: 'sh1ro', nickname2: 'why_n0t', player1Kills: 1, player2Kills: 2, player1KillsPercent: 33, player2KillsPercent: 67, index: 16 },
    { player1Id: "4", player2Id: "7", nickname1: 'sh1ro', nickname2: 'nex1', player1Kills: 3, player2Kills: 0, player1KillsPercent: 100, player2KillsPercent: 0, index: 17 },
    { player1Id: "4", player2Id: "8", nickname1: 'sh1ro', nickname2: 'relo', player1Kills: 2, player2Kills: 4, player1KillsPercent: 33, player2KillsPercent: 67, index: 18 },
    { player1Id: "4", player2Id: "9", nickname1: 'sh1ro', nickname2: 'somuL', player1Kills: 1, player2Kills: 1, player1KillsPercent: 50, player2KillsPercent: 50, index: 19 },
    { player1Id: "4", player2Id: "10", nickname1: 'sh1ro', nickname2: 'plaaaayer', player1Kills: 2, player2Kills: 3, player1KillsPercent: 40, player2KillsPercent: 60, index: 20 },

    { player1Id: "5", player2Id: "6", nickname1: 'dexie', nickname2: 'why_n0t', player1Kills: 3, player2Kills: 1, player1KillsPercent: 75, player2KillsPercent: 25, index: 21 },
    { player1Id: "5", player2Id: "7", nickname1: 'dexie', nickname2: 'nex1', player1Kills: 2, player2Kills: 2, player1KillsPercent: 50, player2KillsPercent: 50, index: 22 },
    { player1Id: "5", player2Id: "8", nickname1: 'dexie', nickname2: 'relo', player1Kills: 0, player2Kills: 4, player1KillsPercent: 0, player2KillsPercent: 100, index: 23 },
    { player1Id: "5", player2Id: "9", nickname1: 'dexie', nickname2: 'somuL', player1Kills: 5, player2Kills: 5, player1KillsPercent: 50, player2KillsPercent: 50, index: 24 },
    { player1Id: "5", player2Id: "10", nickname1: 'dexie', nickname2: 'plaaaayer', player1Kills: 4, player2Kills: 3, player1KillsPercent: 57, player2KillsPercent: 43, index: 25 }
  ];



  selectedUsers:any[]=[]
  selectedUsersId:any[]=[]
  isSelectedToCompare(id:string){
return this.selectedUsersId.includes(id)
  }
  selectUserToCompare(user:any,event:any) {

      if (this.selectedUsers[0]?.steam_id_64 != user.steam_id_64 && this.selectedUsers[1]?.steam_id_64 != user.steam_id_64){
        this.selectedUsers.push({
          steam_id_64:user.steam_id_64,
          nickname_override : user.nickname_override
        })
        this.selectedUsersId.push(user.steam_id_64)
      }else{
        this.selectedUsers=this.selectedUsers.filter((item:any)=>item.steam_id_64 != user.steam_id_64)
        this.selectedUsersId=this.selectedUsersId.filter((item:any)=>item != user.steam_id_64)
      }

    console.log(this.selectedUsers)
  }


  userGameStats:WritableSignal<any|null>=signal<any|null>(null)

  isSelectedToGameStats(id:string){

    return this.userGameStats()?.find((item:any)=>{return item.steamId==id})
  }

  selectUserToGameStats(element: any, index: number){
    this.selectedUsersId=[]
    this.selectedUsers=[]
    console.log("selectUserToGameStats")
    console.log(this.gameStats()[index], element.steam_id_64)
    console.log(this.isSelectedToGameStats(element.steam_id_64))
    if (!this.isSelectedToGameStats(element.steam_id_64)){


        // this.gameStats()[index].find((item:any)=> item.steamId == element.steam_id_64)
      const selectedUser=this.gameStats().map((match:any)=>{
        return  match.find((item:any)=> item.steamId == element.steam_id_64)
      })
      if (selectedUser && selectedUser.length!=0){
        console.log("FINAL")
        console.log(selectedUser)
        this.userGameStats.set(selectedUser)
      }
    }else {
      this.userGameStats.set(null)
    }


  }
  protected readonly String = String;

  ngOnChanges(changes: SimpleChanges): void {

  }
}
