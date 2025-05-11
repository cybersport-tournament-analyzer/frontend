import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {AuthService} from '../../services/http.authService';
import {UserDto} from '../../interfaces/user-dto';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {SpinnerComponent} from '../../features/spinner/spinner.component';
import {DecimalPipe, JsonPipe} from '@angular/common';
import {ButtonComponent} from '../../componets/globals/button/button.component';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {InfoCardComponent} from '../../componets/info-card/info-card.component';
import {StageComponent} from '../../componets/stage/stage.component';
import {TabDirective} from '../../features/tabs/tab.directive';
import {TabsComponent} from '../../features/tabs/tabs.component';
import {
  TournamentMatchScheduleComponent
} from '../../componets/tournament-match-schedule/tournament-match-schedule.component';
import {TournamentStatsComponent} from '../../componets/tournament-stats/tournament-stats.component';
import {ProgressBarComponent} from '../../features/progress-bar/progress-bar.component';
import {ComparePlayersComponent} from '../../features/compare-players/compare-players.component';
import {
  TournamentBracketPredictionComponent
} from '../../features/tournament-bracket-prediction/tournament-bracket-prediction.component';
import {Stats} from 'node:fs';
import {StatsService} from '../../services/stats.service';
import {GameStatsComponent} from '../../componets/game-stats/game-stats.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    SpinnerComponent,
    JsonPipe,
    ButtonComponent,
    ImgURLPipe,
    InfoCardComponent,
    StageComponent,
    TabDirective,
    TabsComponent,
    TournamentMatchScheduleComponent,
    TournamentStatsComponent,
    ProgressBarComponent,
    ComparePlayersComponent,
    TournamentBracketPredictionComponent,
    GameStatsComponent,
    DecimalPipe
  ],
  templateUrl: './profile-page.component.html',
  standalone: true,
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  PLAYER_ID:string
  gameStatsPlayer:WritableSignal<any>=signal(null)
  metaStatsPlayer:WritableSignal<any>=signal(null)
  weaponStatsPlayer:WritableSignal<any>=signal(null)
  constructor(private  authService:AuthService, private route:ActivatedRoute, private  userService:UserService, private statsService:StatsService) {
    this.PLAYER_ID = this.route.snapshot.paramMap.get('id')!
  }
  userData:WritableSignal<UserDto|null> = signal<UserDto|null>(null)

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next:(data:any)=>{
        if (data.steamId == this.route.snapshot.paramMap.get('id')!){
          this.userData.set(data)
        }else {
          this.userService.getUserById(this.route.snapshot.paramMap.get('id')!).subscribe((userData:any)=>{
            this.userData.set(userData)
          })
        }
      }
    })

    this.getGameStats()
    this.getMetaStats()
    this.getWeaponStats()

  }

  getGameStats(){
    this.statsService.getGameStatsByGlobalUsers(this.PLAYER_ID).subscribe((gameStats)=>{
      this.gameStatsPlayer.set(gameStats)
    })

  }
  getMetaStats(){

    this.statsService.getMetaStatsByGlobalUsers(this.PLAYER_ID).subscribe((metaStats)=>{
      this.metaStatsPlayer.set(metaStats)
    })
  }
  getWeaponStats(){

    this.statsService.getWeaponStatsByGlobalUsers(this.PLAYER_ID).subscribe((weaponStats)=>{
      console.log("aaaa")
      console.log(weaponStats)
      this.weaponStatsPlayer.set(weaponStats)
    })
  }




















































  list:any=[
  [
    [
      {
        "score": 2,
        "seed": 1,
        "name": "Vlad"
      },
      {
        "score": 0,
        "seed": 0,
        "name": 'nigga'
      }
    ],
    [
      {
        "score": 2,
        "seed": 2,
        "name": "Rodya"
      },
      {
        "score": 0,
        "seed": 0,
        "name": "huila"
      }
    ],
    [
      {
        "score": 2,
        "seed": 3,
        "name": "Sasha"
      },
      {
        "score": 0,
        "seed": 0,
        "name": "glasha"
      }
    ],
    [
      {
        "score": 0,
        "seed": 4,
        "name": "Diana"
      },
      {
        "score": 0,
        "seed": 5,
        "name": "Nika"
      }
    ],

  ],[],[]

]

  // list:any=[
  //   [
  //     [
  //       {
  //         "score": 2,
  //         "seed": 1,
  //         "name": "Vlad"
  //       },
  //       {
  //         "score": 0,
  //         "seed": 0,
  //         "name": "null"
  //       }
  //     ],
  //     [
  //       {
  //         "score": 2,
  //         "seed": 2,
  //         "name": "Rodya"
  //       },
  //       {
  //         "score": 0,
  //         "seed": 0,
  //         "name": "null"
  //       }
  //     ],
  //     [
  //       {
  //         "score": 2,
  //         "seed": 3,
  //         "name": "Sasha"
  //       },
  //       {
  //         "score": 0,
  //         "seed": 0,
  //         "name": "null"
  //       }
  //     ],
  //     [
  //       {
  //         "score": 0,
  //         "seed": 4,
  //         "name": "Diana"
  //       },
  //       {
  //         "score": 0,
  //         "seed": 5,
  //         "name": "Nika"
  //       }
  //     ],
  //
  //   ],
  //   [
  //     [
  //       {
  //         "score": 0,
  //         "seed": 1,
  //         "name": "Vlad"
  //       },
  //       {
  //         "score": 0,
  //         "seed": 2,
  //         "name": "Rodya"
  //       }
  //     ],
  //     [
  //       {
  //         "score": 0,
  //         "seed": 3,
  //         "name": "Sasha"
  //       },
  //       {
  //         "score": 0,
  //         "seed": 0,
  //         "name": "null"
  //       }
  //     ],
  //   ],
  //   [
  //     [
  //       {
  //         "score": 0,
  //         "seed": 0,
  //         "name": "null"
  //       },
  //       {
  //         "score": 0,
  //         "seed": 0,
  //         "name": "null"
  //       }
  //     ],
  //   ],
  // ]

}
