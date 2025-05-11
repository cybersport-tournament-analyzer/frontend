import {Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {TableComponent} from '../../features/table/table.component';

import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {PrizeDirective} from '../../directives/prize.directive';
import {ButtonComponent} from '../globals/button/button.component';
import {
  CustomCellDefDirective,
  CustomColumnDirective,
  CustomHeaderCellDefDirective
} from '../../features/table/custom-column.directive';
import {TournamentService} from '../../services/tournament/tournament.service';
import {ActivatedRoute} from '@angular/router';
import {StatsService} from '../../services/stats.service';
import {DecimalPipe, JsonPipe} from '@angular/common';
import {InfoCardComponent} from '../info-card/info-card.component';

@Component({
  selector: 'app-tournament-stats',
  imports: [
    TableComponent,

    ImgURLPipe,
    PrizeDirective,
    ButtonComponent,
    CustomColumnDirective,
    CustomHeaderCellDefDirective,
    CustomCellDefDirective,
    JsonPipe,
    InfoCardComponent,
    DecimalPipe
  ],
  templateUrl: './tournament-stats.component.html',
  standalone: true,
  styleUrl: './tournament-stats.component.css'
})
export class TournamentStatsComponent implements OnInit{
  showRes:boolean=true
  @Input()
  tournamentResult:any[]=[
    {
      teamName:"TeamName 1",
      place :1,
      points: 80
    },
    {
      teamName:"TeamName 2",
      place :2,
      points: 70
    },
    {
      teamName:"TeamName 3",
      place :3,
      points: 50
    },
    {
      teamName:"TeamName 4",
      place :4,
      points: -60
    },
    {
      teamName:"TeamName 5",
      place :5,
      points: -80
    }
  ]

  TOURNAMENT_ID:string


  tournamentStats:WritableSignal<any>=signal(null)
  constructor(private tournamentService:TournamentService, private route:ActivatedRoute, private statsService:StatsService) {
    this.TOURNAMENT_ID= this.route.snapshot.paramMap.get('id')!
  }


  changeStats() {
    this.showRes=!this.showRes
  }

  ngOnInit(): void {
    this.statsService.getTournamentStats(this.TOURNAMENT_ID).subscribe((stats:any)=>{
      this.tournamentStats.set(stats)
    })
  }
}
