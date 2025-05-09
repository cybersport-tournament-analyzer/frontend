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

              // this.compareData.set(data.comparisons[0])
              console.log(this.player1?.steam_id_64,this.player1?.nickname_override)
              console.log(this.player2?.steam_id_64,this.player2?.nickname_override)
              console.log(data.comparisons[0])
              console.log(data.comparisons[0].playersStats[0]?.stats?.[0]['playerId'] == this.player1?.steam_id_64)
              console.log( data.comparisons[0].playersStats[0]?.stats?.[0]['playerId'] == this.player1?.steam_id_64)
              this.compareData.set({
                player1:{
                  name:  this.player1?.nickname_override ,
                  parametrs: data.comparisons[0].playersStats[0]?.stats?.[0]['playerId'] == this.player1?.steam_id_64 ? data.comparisons[0].playersStats[0]?.stats : data.comparisons[0].playersStats[1]?.stats,
                  score: data.comparisons[0].playersStats[0]?.stats?.[0]['playerId'] == this.player1?.steam_id_64 ? data.comparisons[0].player1Score : data.comparisons[0].player2Score,
                  duels:{
                    player1KillsPercent:data.comparisons[0]?.duels.player1Id == this.player1?.steam_id_64 ? data.comparisons[0].duels.player1KillsPercent : data.comparisons[0].duels.player2KillsPercent,
                    player1Kills: data.comparisons[0]?.duels.player1Id == this.player1?.steam_id_64 ? data.comparisons[0].duels.player1Kills : data.comparisons[0].duels.player2Kills
                  }
                },
                player2:{
                  name: this.player2?.nickname_override,
                  parametrs: data.comparisons[0].playersStats[1]?.stats?.[0]['playerId'] == this.player2?.steam_id_64 ? data.comparisons[0].playersStats[1]?.stats : data.comparisons[0].playersStats[0]?.stats,
                  score: data.comparisons[0].playersStats[1]?.stats?.[0]['playerId'] == this.player2?.steam_id_64 ? data.comparisons[0].player2Score : data.comparisons[0].player1Score,
                  duels:{
                    player1KillsPercent:data.comparisons[0]?.duels.player2Id == this.player2?.steam_id_64 ? data.comparisons[0].duels.player2KillsPercent : data.comparisons[0].duels.player1KillsPercent,
                    player1Kills: data.comparisons[0]?.duels.player2Id == this.player2?.steam_id_64 ? data.comparisons[0].duels.player2Kills : data.comparisons[0].duels.player1Kills
                  }
                }
              })
              console.log(this.compareData())
            }
          }
        )
      } else if (this.config?.scope=='series'){
        this.statsService.getComparePlayersInSeries(this.route.snapshot.paramMap.get('id')!).subscribe(
          (data:any)=>{
            if (data){

              // this.compareData.set(data.comparisons[0])
              console.log(this.player1?.steam_id_64,this.player1?.nickname_override)
              console.log(this.player2?.steam_id_64,this.player2?.nickname_override)
              console.log(data.comparisons[0])
              console.log(data.comparisons[0].playersStats[0]?.stats?.[0]['playerId'] == this.player1?.steam_id_64)
              console.log( data.comparisons[0].playersStats[0]?.stats?.[0]['playerId'] == this.player1?.steam_id_64)
              this.compareData.set({
                player1:{
                  name:  this.player1?.nickname_override ,
                  parametrs: data.comparisons[0].playersStats[0]?.stats?.[0]['playerId'] == this.player1?.steam_id_64 ? data.comparisons[0].playersStats[0]?.stats : data.comparisons[0].playersStats[1]?.stats,
                  score: data.comparisons[0].playersStats[0]?.stats?.[0]['playerId'] == this.player1?.steam_id_64 ? data.comparisons[0].player1Score : data.comparisons[0].player2Score,
                  duels:{
                    player1KillsPercent:data.comparisons[0]?.duels.player1Id == this.player1?.steam_id_64 ? data.comparisons[0].duels.player1KillsPercent : data.comparisons[0].duels.player2KillsPercent,
                    player1Kills: data.comparisons[0]?.duels.player1Id == this.player1?.steam_id_64 ? data.comparisons[0].duels.player1Kills : data.comparisons[0].duels.player2Kills
                  }
                },
                player2:{
                  name: this.player2?.nickname_override,
                  parametrs: data.comparisons[0].playersStats[1]?.stats?.[0]['playerId'] == this.player2?.steam_id_64 ? data.comparisons[0].playersStats[1]?.stats : data.comparisons[0].playersStats[0]?.stats,
                  score: data.comparisons[0].playersStats[1]?.stats?.[0]['playerId'] == this.player2?.steam_id_64 ? data.comparisons[0].player2Score : data.comparisons[0].player1Score,
                  duels:{
                    player1KillsPercent:data.comparisons[0]?.duels.player2Id == this.player2?.steam_id_64 ? data.comparisons[0].duels.player2KillsPercent : data.comparisons[0].duels.player1KillsPercent,
                    player1Kills: data.comparisons[0]?.duels.player2Id == this.player2?.steam_id_64 ? data.comparisons[0].duels.player2Kills : data.comparisons[0].duels.player1Kills
                  }
                }
              })
              console.log(this.compareData())
            }
          }
        )
      }

    }
  }


  protected readonly Object = Object;
}
