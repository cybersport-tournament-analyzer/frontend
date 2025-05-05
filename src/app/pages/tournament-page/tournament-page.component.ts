import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {TabsComponent} from '../../features/tabs/tabs.component';
import {TabDirective} from '../../features/tabs/tab.directive';
import {JsonPipe, NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {InfoCardComponent} from '../../componets/info-card/info-card.component';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {ButtonComponent} from '../../componets/globals/button/button.component';
import {StageComponent} from '../../componets/stage/stage.component';
import {
  TournamentMatchScheduleComponent,
} from '../../componets/tournament-match-schedule/tournament-match-schedule.component';
import {TournamentStatsComponent} from '../../componets/tournament-stats/tournament-stats.component';
import {TournamentService} from '../../services/tournament/tournament.service';
import {ActivatedRoute} from '@angular/router';
import {TournamentStatus} from '../../enums/tournament-status';
import {TagComponent} from '../../componets/globals/tag/tag.component';
import {UtilService} from '../../services/util.service';
import {ModalWindowComponent} from '../../features/modal-window/modal-window.component';
import {TournamentCreateComponent} from '../../componets/tournament-create/tournament-create.component';
import {TeamRegistrationComponent} from '../../componets/team-registration/team-registration.component';

@Component({
  selector: 'app-tournament-page',
  imports: [
    TabsComponent,
    TabDirective,
    NgIf,
    NgTemplateOutlet,
    NgClass,
    InfoCardComponent,
    ImgURLPipe,
    ButtonComponent,
    StageComponent,
    TournamentMatchScheduleComponent,
    TournamentStatsComponent,
    TagComponent,
    JsonPipe,
    ModalWindowComponent,
    TournamentCreateComponent,
    TeamRegistrationComponent
  ],
  templateUrl: './tournament-page.component.html',
  standalone: true,
  styleUrl: './tournament-page.component.css'
})
export class TournamentPageComponent implements OnInit{
  steps=[
    {title:'Окно готовности окрывается',content:'Подтвердите готовность и подтвердите, что можете играть',stage:0},
    {title:'Распределение',content:'Начальные матчи были распределены и готовы к старту турнира',stage:1},
    {title:'Старт',content:'Начало соревнования.',stage:2},
    {title:'Завершение',content:'Конец соревнования.',stage:3},
  ]

  @ViewChild(TeamRegistrationComponent)
  teamRegistrationComponent!: TeamRegistrationComponent;

  onModalToggle(isOpen: boolean) {
    if (!isOpen) {
      this.teamRegistrationComponent.resetForm();
    }
  }

  private _currentStep:any=0
  set currentStep(stage:TournamentStatus){
    switch (stage){
      case TournamentStatus.NOT_STARTED :
        this._currentStep=0;
        break;

      case TournamentStatus.REGISTRATION:
        this._currentStep=1;
        break;

      case TournamentStatus.REGISTRATION_ENDED:
        this._currentStep=1;
        break;
      case TournamentStatus.ACTIVE:
        this._currentStep=2;
        break;
      case TournamentStatus.COMPLETED:
        this._currentStep=3;
        break;
    }
    console.log(this._currentStep)
    console.log("switch")
  }
  get currentStep():number{

    return this._currentStep
  }
  data:any=signal(null)
  matchSchedule:any[]=[]
  constructor(private tournamentService:TournamentService,private route: ActivatedRoute, protected utilService:UtilService) {
  }
  stages:any=signal(null)

  ngOnInit(): void {
    this.tournamentService.getTournamentData(this.route.snapshot.paramMap.get('id')!).subscribe((data:any)=>{
      console.log("TOURNAMENT INIT")
      console.log(data)
      this.data.set(data)
    // this.data=data
    // this.data.tournamentStatus='REGISTRATION'
      this.currentStep=this.data().tournamentStatus
      this.matchSchedule = this.data().matchSchedule
      this.data().formatTournamentStartTime=this.utilService.formatTimeRemaining(this.data().tournamentStartTime)
      // this.data.formatregistrationEndTime={this.utilService.getTimeRemaining(data.tournamentStartTime)
      // this.data.formatregistrationStartTime={this.utilService.getTimeRemaining(data.tournamentStartTime)
      // this.data.formatcreatedAt={this.utilService.getTimeRemaining(data.tournamentStartTime)
      // registrationEndTime
      // registrationStartTime
      // createdAt


    })
    this.tournamentService.getStandingsTournament(this.route.snapshot.paramMap.get('id')!).subscribe((data:any)=>{
      console.log(data)
      this.stages.set(data)
    })

    // this.tournamentService.getTournamentData("a7d05b4c-9602-4a61-b9d5-3155600d1e79")
  }

  getMatchSchedule(){
    console.log(this.tournamentService.getMatchSchedule)
    return this.tournamentService.getMatchSchedule()
  }
  isOpen = false;

  onModal() {
    this.isOpen = true;
  }
}
