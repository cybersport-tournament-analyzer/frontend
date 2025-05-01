import {Component, Input, OnInit} from '@angular/core';
import {JsonPipe, NgClass} from '@angular/common';
import {TagComponent} from '../globals/tag/tag.component';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {Router} from '@angular/router';
import {ScheduleStatus} from "../../enums/schedule-status";
import {state} from '@angular/animations';
import {match} from 'node:assert';

@Component({
  selector: 'app-tournament-match-schedule',
  imports: [
    NgClass,
    TagComponent,
    ImgURLPipe,
    JsonPipe
  ],
  templateUrl: './tournament-match-schedule.component.html',
  standalone: true,
  styleUrl: './tournament-match-schedule.component.css'
})
export class TournamentMatchScheduleComponent implements OnInit{
  protected matchStates:any[]=['Все','Идет','Скоро','Завершено']
  public selectedState:any='ALL'

  get scheduleStates() {
    return [
      { key: 'ALL', value: 'Все' }, // <- добавим "все" отдельно
      ...Object.entries(ScheduleStatus).map(([key, value]) => ({ key, value }))
    ];
  }

  constructor(private router:Router)  {
  }
  @Input()
  matchList!: any[]
  printMatchList!:any[]

  getScheduleStatus(state: keyof typeof ScheduleStatus): string {
    return ScheduleStatus[state];
  }

  selectState(stateKey: string) {
    this.selectedState = stateKey;
    console.log(stateKey)
    if (stateKey === 'ALL') {
      this.printMatchList = this.matchList;
    } else {
      this.printMatchList = this.matchList.filter(
        item => item.schedule.status === stateKey
      );
    }
  }


  goToLobby(match:any) {
    this.router.navigate(
      [match.schedule.status==="COMPLETED" ? "/match/":"/lobby/", match.id],
    );
    // console.log(this.scheduleStates.values( match.schedule.status),ScheduleStatus.COMPLETED)
    // console.log([match.schedule.state===ScheduleStatus.COMPLETED ? "/match/":"/lobby/", match.id])
  }



  ngOnInit(): void {
    this.printMatchList = this.matchList
  }
}






// [
//   {
//     id:'1',
//     date:'Вс, 9 Марта, 21:15',
//     state:'COMPLETED',
//
//     teams:[
//       {
//         teamName:'Teamname 1',
//         imgUrl:null,
//         scoreTeam:1,
//       },
//       {
//         teamName:'Teamname 2',
//         imgUrl:null,
//         scoreTeam:0,
//       },
//     ]
//   },
//   {
//     id:'2',
//     date:'Вс, 9 Марта, 21:15',
//     state:'IN_PROGRESS',
//     teams:[
//       {
//         teamName:'Teamname 1',
//         imgUrl:null,
//         scoreTeam:2,
//       },
//       {
//         teamName:'Teamname 2',
//         imgUrl:null,
//         scoreTeam:0,
//       },
//     ]
//   },
//   {
//     id:'3',
//     date:'Вс, 9 Марта, 21:15',
//     state:'SCHEDULED',
//     teams:[
//       {
//         teamName:'Teamname 1',
//         imgUrl:null,
//         scoreTeam:3,
//       },
//       {
//         teamName:'Teamname 2',
//         imgUrl:null,
//         scoreTeam:0,
//       },
//     ]
//   },
//   {
//     id:'4',
//     date:'Вс, 9 Марта, 21:15',
//     state:'SCHEDULED',
//     teams:[
//       {
//         teamName:'Teamname 1',
//         imgUrl:null,
//         scoreTeam:4,
//       },
//       {
//         teamName:'Teamname 2',
//         imgUrl:null,
//         scoreTeam:0,
//       },
//     ]
//   },
// ];
