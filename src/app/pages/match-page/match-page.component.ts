import {Component, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {TagComponent} from '../../componets/globals/tag/tag.component';
import {TabsComponent} from '../../features/tabs/tabs.component';
import {StageComponent} from '../../componets/stage/stage.component';
import {TabDirective} from '../../features/tabs/tab.directive';
import {JsonPipe, NgClass, NgForOf, NgIf} from '@angular/common';
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
    InfoSeriesBlockWithCompareComponent
  ],
  templateUrl: './match-page.component.html',
  standalone: true,
  styleUrl: './match-page.component.css'
})
export class MatchPageComponent implements OnInit{
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

  config:any ={
    "1":'FischeR_ts33', "2":'lolpik33', "3":'swoow1', "4":'sh1ro', "5":'dexie',
    "6":'why_n0t', "7":'nex1', "8":'relo', "9":'somuL', "10":'plaaaayer',
  }

  baseStatsInMatches:WritableSignal<any>= signal<any>([])
  constructor(private matchService:MatchService, private route:ActivatedRoute, private router:Router) {
  }
  public seriesData: WritableSignal<any> = signal<any>(null)
  public matches: WritableSignal<any> = signal<any>(null)
  public comparePlayers: WritableSignal<any> = signal<any>(null)
  ngOnInit(): void {

    this.matchService.getInfoSeries(this.route.snapshot.paramMap.get('id')!).subscribe({next:(data:any)=> {
      if (data) {
      this.seriesData.set({
        ...data,
        format: data.pickBanSession?.format
      })
      this.matches.set(Object.values(this.seriesData()?.matches))
      console.log(Object.values(this.seriesData()?.matches))
      this.baseStatsInMatches.set((this.preparareTeamBaseStat(this.matches())))
      console.log(this.baseStatsInMatches())
    }
    },
      error:()=>{
      this.router.navigate(['/home'])
    }
      }
    )

    this.preparareDuelsMatrix()













  }
  preparareDuelsMatrix(){

    const team1Ids = Array.from(new Set(this.testDuels.map(d => d.player1Id.toString())));
    const team2Ids = Array.from(new Set(this.testDuels.map(d => d.player2Id.toString())));
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

        const duel = this.testDuels.find(d =>
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
  isSelected(id:string){
return this.selectedUsersId.includes(id)
  }
  selectUser(user:any,event:any) {

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

  protected readonly String = String;
}
