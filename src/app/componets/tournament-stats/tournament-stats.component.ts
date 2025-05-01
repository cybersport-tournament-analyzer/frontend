import { Component } from '@angular/core';
import {TableComponent} from '../../features/table/table.component';

import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {PrizeDirective} from '../../directives/prize.directive';
import {ButtonComponent} from '../globals/button/button.component';
import {
  CustomCellDefDirective,
  CustomColumnDirective,
  CustomHeaderCellDefDirective
} from '../../features/table/custom-column.directive';

@Component({
  selector: 'app-tournament-stats',
  imports: [
    TableComponent,

    ImgURLPipe,
    PrizeDirective,
    ButtonComponent,
    CustomColumnDirective,
    CustomHeaderCellDefDirective,
    CustomCellDefDirective
  ],
  templateUrl: './tournament-stats.component.html',
  standalone: true,
  styleUrl: './tournament-stats.component.css'
})
export class TournamentStatsComponent {
  showRes:boolean=true
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

  changeStats() {
    this.showRes=!this.showRes
  }
}
