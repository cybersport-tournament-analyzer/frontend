import {Component, OnInit, signal} from '@angular/core';
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
    ButtonComponent
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

  constructor(private matchService:MatchService, private route:ActivatedRoute) {
  }
  public seriesData: any = signal(null)
  public matches: any = signal(null)
  ngOnInit(): void {

    this.matchService.getInfoSeries(this.route.snapshot.paramMap.get('id')!).subscribe((data:any)=>{
      this.seriesData.set(data)
      this.matches.set(Object.values(this.seriesData()?.matches))
    })
  }


  protected readonly Object = Object;
}
