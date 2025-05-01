import {Component, Input, OnInit} from '@angular/core';
import {InfoCardComponent} from '../info-card/info-card.component';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {TabsComponent} from '../../features/tabs/tabs.component';
import {TabDirective} from '../../features/tabs/tab.directive';
import {TournamentBracketComponent} from '../../features/tournament-bracket/tournament-bracket.component';
import {TableComponent} from '../../features/table/table.component';
import {
  CustomCellDefDirective,
  CustomColumnDirective,
  CustomHeaderCellDefDirective
} from '../../features/table/custom-column.directive';
import {JsonPipe} from '@angular/common';
import {StagesPipe} from '../../pipes/stages.pipe';
import {TournamentService} from '../../services/tournament/tournament.service';

@Component({
  selector: 'app-stage',
  imports: [
    InfoCardComponent,
    ImgURLPipe,
    TabsComponent,
    TabDirective,
    TournamentBracketComponent,
    TableComponent,
    CustomColumnDirective,
    CustomCellDefDirective,
    CustomHeaderCellDefDirective,
    JsonPipe,
    StagesPipe
  ],
  templateUrl: './stage.component.html',
  standalone: true,
  styleUrl: './stage.component.css'
})
export class StageComponent implements OnInit{
  // stages:any[]=[{description:'Группа',name:'group'},{description:'Выбывание после 1 поражения',name:'bracket'}]
  @Input()stages!:any[]
  selectedStage:any =null

  groupData:any[]=[
    {
      teamDto: {
        id: "e73148a6-566a-4351-a40a-a8612fe52c56",
        tournamentId: "d57fa029-6621-415a-a2ba-b215bbb34fc1",
        teamName: "пизда",
        flag: "RU",
        creatorSteamId: "76561198258376387",
        averageRating: 680,
        seed: 2,
        players: [
          {
            id: "1510f2d8-9aba-4109-bce4-a7551324694a",
            playerSteamId: "76561198258376387",
            inGameRoles: []
          }
        ]
      },
      place: 1,
      wins: 1,
      losses: 1,
      points: 2,
      roundsWon: 3,
      roundsLost: 4,
      roundDifference: -1,
      groupLetter: "A"
    }, {
      teamDto: {
        id: "92fb4ed3-2549-4f97-8e10-a2f8042e41c7",
        tournamentId: "d57fa029-6621-415a-a2ba-b215bbb34fc1",
        teamName: "vl",
        flag: "RU",
        creatorSteamId: "76561198295068808",
        averageRating: 1726,
        seed: 1,
        players: [
          {
            id: "94a58961-08ec-42f7-9436-58d3a7acbcde",
            playerSteamId: "76561198295068808",
            inGameRoles: []
          }
        ]
      },
      place: 2,
      wins: 1,
      losses: 1,
      points: 2,
      roundsWon: 4,
      roundsLost: 3,
      roundDifference: 1,
      groupLetter: "A"
    },
    {
      teamDto: {
        id: "9cd202bc-5053-414c-a263-35c573d4ee7f",
        tournamentId: "d57fa029-6621-415a-a2ba-b215bbb34fc1",
        teamName: "дебилол",
        flag: "RU",
        creatorSteamId: "76561199624601310",
        averageRating: 0,
        seed: 3,
        players: [
          {
            id: "a734eebe-e5aa-4d81-8a81-f741e62ab230",
            playerSteamId: "76561199624601310",
            inGameRoles: []
          }
        ]
      },
      place: 3,
      wins: 1,
      losses: 1,
      points: 2,
      roundsWon: 3,
      roundsLost: 3,
      roundDifference: 0,
      groupLetter: "A"
    }
    ,
    {
      teamDto: {
        id: "9cd202bc-5053-414c-a263-35c573d4ee7f",
        tournamentId: "d57fa029-6621-415a-a2ba-b215bbb34fc1",
        teamName: "дебилол",
        flag: "RU",
        creatorSteamId: "76561199624601310",
        averageRating: 0,
        seed: 3,
        players: [
          {
            id: "a734eebe-e5aa-4d81-8a81-f741e62ab230",
            playerSteamId: "76561199624601310",
            inGameRoles: []
          }
        ]
      },
      place: 3,
      wins: 1,
      losses: 1,
      points: 2,
      roundsWon: 3,
      roundsLost: 3,
      roundDifference: 0,
      groupLetter: "B"
    },
    {
      teamDto: {
        id: "9cd202bc-5053-414c-a263-35c573d4ee7f",
        tournamentId: "d57fa029-6621-415a-a2ba-b215bbb34fc1",
        teamName: "дебилол",
        flag: "RU",
        creatorSteamId: "76561199624601310",
        averageRating: 0,
        seed: 3,
        players: [
          {
            id: "a734eebe-e5aa-4d81-8a81-f741e62ab230",
            playerSteamId: "76561199624601310",
            inGameRoles: []
          }
        ]
      },
      place: 3,
      wins: 1,
      losses: 1,
      points: 2,
      roundsWon: 3,
      roundsLost: 3,
      roundDifference: 0,
      groupLetter: "B"
    }
  ]
  dataStages:any=[]
  constructor(private tournamentService:TournamentService) {

    // this.groupData=temp
  }
  selectStage(stage:any){
    console.log(stage)
    this.selectedStage=stage;
  }
  stageData:any={}

  ngOnInit(): void {
    for (const stage of this.stages) {
      console.log(stage.id)
      if(stage.stageType=='Groups'){
        this.tournamentService.getStageStandings(stage.id).subscribe(
          (data:any)=>{
            console.log(data)
            const dataResult=[]
            // console.log(stage.numberOfGroups)
            // if(stage.stageType=='Groups'){
            const litters=["A","B","C","D"]
            let temp:any[] =[]

            for (let i = 0; i < stage.numberOfGroups; i++) {
              let tmp2=data.filter((item:any)=>{return item.groupLetter==litters[i]})
              if (tmp2.length!=0){
                temp.push(tmp2)
              }
            }
            dataResult.push(temp)
            console.log("groupByLitters")
            console.log(dataResult)
            // }

            this.stageData={
              ...this.stageData,
              [stage.id]: dataResult
            }
            console.log("FINALS")
            console.log(this.stageData)
          }
        )

      }
      if(stage.stageType=='Single Elimination'){
        this.tournamentService.getStageSingleEl(stage.id).subscribe(
          (data:any)=>{
            console.log(data)

            this.stageData={
              ...this.stageData,
              [stage.id]: data
            }
            console.log("FINALS")
            console.log(this.stageData)
          }
        )
      }

    }
    // console.log(this.stageData)
    // this.tournamentService.getStageStandings().subscribe()

  }
}
