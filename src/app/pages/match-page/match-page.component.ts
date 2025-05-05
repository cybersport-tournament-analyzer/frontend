import {Component, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {TagComponent} from '../../componets/globals/tag/tag.component';
import {TabsComponent} from '../../features/tabs/tabs.component';
import {StageComponent} from '../../componets/stage/stage.component';
import {TabDirective} from '../../features/tabs/tab.directive';
import {JsonPipe, NgClass} from '@angular/common';
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
    InfoCardComponent
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

  baseStatsInMatches:WritableSignal<any>= signal<any>([])
  constructor(private matchService:MatchService, private route:ActivatedRoute) {
  }
  public seriesData: WritableSignal<any> = signal<any>(null)
  public matches: WritableSignal<any> = signal<any>(null)
  ngOnInit(): void {

    this.matchService.getInfoSeries(this.route.snapshot.paramMap.get('id')!).subscribe((data:any)=>{
      this.seriesData.set({...data,
      format:data.pickBanSession.format})
      this.matches.set(Object.values(this.seriesData()?.matches))
      console.log(Object.values(this.seriesData()?.matches))
      this.baseStatsInMatches.set((this.preparareTeamBaseStat(this.matches())))
      console.log(this.baseStatsInMatches())
    })
  }
  preparareTeamBaseStat(matches :any[]): any{
    const pullTeam1 = Object.values(this.seriesData().team1).map((item:any)=>{ return item.playerUsername})
    const pullTeam2 = Object.values(this.seriesData().team2).map((item:any)=>{ return item.playerUsername})
    console.log(pullTeam1)
    console.log(pullTeam2)
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
          team2:statTeam2InAllMatches[i]
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
}
