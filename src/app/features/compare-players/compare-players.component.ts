import {Component, Input, OnChanges, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {DecimalPipe, JsonPipe, NgOptimizedImage} from '@angular/common';
import {SpinnerComponent} from '../spinner/spinner.component';
import {StatsService} from '../../services/stats.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-compare-players',
  imports: [
    ProgressBarComponent,
    ImgURLPipe,
    NgOptimizedImage,
    SpinnerComponent,
    JsonPipe,
    DecimalPipe
  ],
  templateUrl: './compare-players.component.html',
  standalone: true,
  styleUrl: './compare-players.component.css'
})
export class ComparePlayersComponent implements OnChanges{


  compareData:WritableSignal<any> = signal<any>(null);

  @Input()
  player1: { steam_id_64:string;
    nickname_override : string } |null=null
  @Input()
  player2:{ steam_id_64:string;
    nickname_override : string } |null=null

  constructor(private statsService:StatsService, private route:ActivatedRoute) {
  }
  @Input()
  config:{scope:string; matchId?:number}|null=null

  ngOnChanges(changes: SimpleChanges): void {
    if (this.player1 && this.player2){
      if (this.config?.scope=='match'){
        this.statsService.getComparePlayersInMatch(this.route.snapshot.paramMap.get('id')!,this.config?.matchId!).subscribe(
          (data:any)=>{
            if (data){
              this.compareData.set(data.comparisons[0])
            }
          }
        )
      } else if (this.config?.scope=='series'){
        this.statsService.getComparePlayersInSeries(this.route.snapshot.paramMap.get('id')!).subscribe(
          (data:any)=>{
            if (data){
              this.compareData.set(data.comparisons[0])
            }
          }
        )
      }

    }
  }


}
