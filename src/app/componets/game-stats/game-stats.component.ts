import {Component, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {InfoCardComponent} from '../info-card/info-card.component';

@Component({
  selector: 'app-game-stats',
  imports: [
    DecimalPipe,
    InfoCardComponent
  ],
  templateUrl: './game-stats.component.html',
  standalone: true,
  styleUrl: './game-stats.component.css'
})
export class GameStatsComponent {

  @Input()
  playerStats!:any

}
