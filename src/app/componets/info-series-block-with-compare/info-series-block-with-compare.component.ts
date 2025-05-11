import {Component, EventEmitter, Input, OnInit, Output, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {ButtonComponent} from '../globals/button/button.component';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {TagComponent} from '../globals/tag/tag.component';
import {TimePipe} from '../../pipes/time.pipe';
import {UserDto} from '../../interfaces/user-dto';
import {ComparePlayersComponent} from '../../features/compare-players/compare-players.component';
import {DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {StatsService} from '../../services/stats.service';
import {ActivatedRoute} from '@angular/router';
import {GameStatsComponent} from '../game-stats/game-stats.component';
import {
  CustomCellDefDirective,
  CustomColumnDirective,
  CustomHeaderCellDefDirective
} from '../../features/table/custom-column.directive';
import {IdToNicknamePipe} from '../../pipes/id-to-nickname.pipe';
import {TableComponent} from '../../features/table/table.component';

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
  selector: 'app-info-series-block-with-compare',
  imports: [
    ButtonComponent,
    ImgURLPipe,
    TagComponent,
    TimePipe,
    ComparePlayersComponent,
    JsonPipe,
    NgClass,
    GameStatsComponent,
    CustomCellDefDirective,
    CustomColumnDirective,
    CustomHeaderCellDefDirective,
    IdToNicknamePipe,
    NgForOf,
    NgIf,
    TableComponent,
    DecimalPipe
  ],
  templateUrl: './info-series-block-with-compare.component.html',
  standalone: true,
  styleUrl: './info-series-block-with-compare.component.css'
})
export class InfoSeriesBlockWithCompareComponent implements OnInit{

  @Input()
  data!:GameData
  @Input() internalData: any;

  @Input()
  configNames:any

  public  statsMatch : any;
  SERIES_ID:string = ''
  constructor(private statsService:StatsService, private route:ActivatedRoute) {
    this.SERIES_ID = this.route.snapshot.paramMap.get('id')!;

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['internalData'] && changes['internalData'].currentValue) {
      this.processStats(changes['internalData'].currentValue);
    }
  }

  private processStats(data: any) {
    // Преобразуй или скопируй данные, если нужно
    this.statsMatch = { ...data };
    // Если включён OnPush, можешь вручную вызвать ChangeDetectorRef.detectChanges()
  }
  @Input()
  user:UserDto|null=null

  @Output() changeStatusClicked = new EventEmitter<boolean>();

  onButtonClick(ready: boolean) {
    this.changeStatusClicked.emit(ready);
  }
  protected readonly Object:any = Object;
  protected readonly Number = Number;


  selectedUsers:any[]=[]
  selectedUsersId:any[]=[]
  isSelected(id:string){
    return this.selectedUsersId.includes(id)
  }
  selectUser(user:any,event:any) {

    if (this.selectedUsers[0]?.steam_id_64 != user.playerSteamId && this.selectedUsers[1]?.steam_id_64 != user.playerSteamId){
      this.selectedUsers.push({
        steam_id_64:user.playerSteamId,
        nickname_override : user.playerUsername
      })
      this.selectedUsersId.push(user.playerSteamId)
    }else{
      this.selectedUsers=this.selectedUsers.filter((item:any)=>item.steam_id_64 != user.playerSteamId)
      this.selectedUsersId=this.selectedUsersId.filter((item:any)=>item != user.playerSteamId)
    }

    console.log(this.selectedUsers)
  }

  ngOnInit(): void {
    this.loadAllStats()
    this.getDuels()
  }

  loadAllStats() {
    const statsRequests = [];
    for (const datum of Object.values(this.data.team1)) {
      // console.log(datum.playerSteamId , this.SERIES_ID); // No error now
      statsRequests.push(this.statsService.getGameStatsBySeries(this.SERIES_ID, datum.playerSteamId));
    }

    for (const datum of Object.values(this.data.team2)) {
      // console.log(datum.playerSteamId , this.SERIES_ID); // No error now
      statsRequests.push(this.statsService.getGameStatsBySeries(this.SERIES_ID, datum.playerSteamId));
    }


    Promise.all(statsRequests.map(req => req.toPromise())).then((results: any[]) => {

      console.log("IN PROMIS")
      console.log(results)
      this.gameStats.set(results)

    });


  }
  gameStats:WritableSignal<any>=signal(null)
  userGameStats:WritableSignal<any|null>=signal<any|null>(null)

  isSelectedToGameStats(id:string){

    return this.userGameStats()?.steamId==id
  }

  selectUserToGameStats(element: any){
    console.log(this.gameStats())
    if (!this.isSelectedToGameStats(element.playerSteamId)){


      // this.gameStats()[index].find((item:any)=> item.steamId == element.steam_id_64)
      const selectedUser= this.gameStats().find((item:any)=> item.steamId == element.playerSteamId)

      if (selectedUser){
        console.log("FINAL")
        console.log(selectedUser)
        this.userGameStats.set(selectedUser)
      }
    }else {
      this.userGameStats.set(null)
    }


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

    this.configNames = {
      ...this.configNames,
      ...teamConfig,
    };


  }
  playerIds: string[] = [];
  matrixData: any[] = [];
  matrixDuels:WritableSignal<any>=signal([])

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
    this.matrixDuels.set(this.matrixData)

  }
  getDuels() {
    // const duelRequests = [];
    this.statsService.getDuelsBySeries(this.SERIES_ID).subscribe((data:any)=>{
      console.log("getDuels")
      console.log(data)
      this.buildMatrixFromDuels(data.duels)
    })

    // for (let i = 0; i < matchCount; i++) {
    //   duelRequests.push(this.statsService.getDuelsByOrder(this.SERIES_ID, i));
    // }
    //
    // Promise.all(duelRequests.map(req => req.toPromise())).then((results: any[]) => {
    //   this.duelsBySeriesOrder.set(results);
    //   const allDuels = results.flat(); // Собираем все дуэли в один массив
    //   console.log("allDuels")
    //   console.log(allDuels)
    //
    //   const duels = allDuels.map(item=> {return item.duels} )
    //   console.log(duels)
    //   for (let i = 0; i < duels.length; i++) {
    //     this.buildMatrixFromDuels(duels[i]);
    //   }
    //   // this.buildMatrixFromDuels(duels[0]);
    //   console.log("this.matrixData")
    //   console.log(this.matrixDuels())
    //
    // });
  }

  protected readonly String = String;
}
