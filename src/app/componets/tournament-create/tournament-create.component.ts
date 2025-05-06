import {Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal} from '@angular/core';
import {StepComponent} from '../../features/stepper/step/step.component';
import {StepperComponent} from '../../features/stepper/stepper.component';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe, NgForOf} from '@angular/common';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {ButtonComponent} from '../globals/button/button.component';
import {TournamentService} from '../../services/tournament/tournament.service';
import {AuthService} from '../../services/http.authService';

@Component({
  selector: 'app-tournament-create',
  imports: [
    StepComponent,
    StepperComponent,
    NgForOf,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatLabel,
    MatFormField,
    ButtonComponent,
    JsonPipe
  ],
  templateUrl: './tournament-create.component.html',
  standalone: true,
  styleUrl: './tournament-create.component.css'
})
export class TournamentCreateComponent implements OnInit{

  @Output() onSend :EventEmitter<boolean> = new EventEmitter<boolean>();

  form: FormGroup;
  interestsList = ['1vs1', '2vs2', '5vs5'];
  public resetForm(): void {
    this.form.reset({
      creatorId: this.form.get('creatorId')?.value // сохраняем steamId пользователя
    });

    // Сбрасываем состояние формы
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }
  errors :WritableSignal<string|null> = signal<string|null>(null)

  constructor(private fb: FormBuilder, private tournamentService:TournamentService, private authService:AuthService) {

    this.form = this.fb.group({

      tournamentName: [],
          creatorId: [null,],
          teamsCount: [null, ],
          substitutionsNumber: [],
      tournamentMode: [''] ,// Храним выбранное значение
          registrationStartTime: [],
          registrationEndTime: [],
          tournamentStartTime: [],
      stages: this.fb.array([
        this.fb.group({
          stageType: ['Single Elimination', ],
          finalMatchFormat: ['', ],
          matchFormat: ['', ],
          matchForTheThirdPlace: [false, ],
          numberOfGroups: [ ],
          teamsToAdvance: [ ],
          totalRounds: [ ],
        })
      ], Validators.required)
    });


  }


  get stages(): FormArray {
    return this.form.get('stages') as FormArray;
  }

  addStage() {
    this.stages.push(this.fb.group({
      stageType: ['Single Elimination', ],
      finalMatchFormat: ['', ],
      matchFormat: ['', ],
      matchForTheThirdPlace: [false, ],
      numberOfGroups: [null, ],
      teamsToAdvance: [null, ],
      totalRounds: [null, ],
    }));
  }

  removeStage(index: number) {
    this.stages.removeAt(index);
  }
  onSubmit() {
    if (this.form.invalid) {
      console.log('RequiredError')
      this.form.markAllAsTouched();
      return;
    }
    console.log('Просмотр  данных:', this.form.value);

    const formValue = this.form.value;
    const stagesReq= formValue.stages.map((item:any)=>{return {
      ...item,
      numberOfGroups: Number(item.numberOfGroups),
      teamsToAdvance: Number(item.teamsToAdvance),
      totalRounds: Number(item.totalRounds),
    }})
    const payload = {
      ...formValue,
      registrationStartTime: new Date(formValue.registrationStartTime).toISOString(),
      registrationEndTime: new Date(formValue.registrationEndTime).toISOString(),
      tournamentStartTime: new Date(formValue.tournamentStartTime).toISOString(),
      stages: stagesReq,
      teamsCount: Number(formValue.teamsCount),
      substitutionsNumber: Number(formValue.substitutionsNumber)
    };

    console.log('Отправка данных:', payload);
    this.tournamentService.createTournament(payload).subscribe({
      next: (res) => {
        console.log("SUCCESS", res);
        this.onSend.emit(true);
      },
      error: (err) => {
        console.error("ERROR", err);
        if (err){
          this.errors.set(err.error.message)

        }else {
          this.errors.set("Ошибка создания турнира")
        }
        this.onSend.emit(false);
      }
      }
    )
    // this.form.reset()

  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((data:any)=>{
      this.form.get('creatorId')?.setValue(data?.steamId);

    })

  }




  // tournamentCreateForm: FormGroup;
  //
  // modes = [
  //   { name: '1vs1', id: 1 },
  //   { name: '2vs2', id: 2 },
  //   { name: '3vs3', id: 3 }
  // ];
  //
  // constructor(private fb: FormBuilder) {
  //   this.tournamentCreateForm = this.fb.group({
  //     tournamentName: new FormControl(),
  //     creatorId: new FormControl("1"),
  //     teamsCount: new FormControl(0),
  //     substitutionsNumber: new FormControl(0),
  //     tournamentMode: this.fb.array(this.modes.map(m => new FormControl(m.id === 1))), // только 1vs1 выбран
  //     registrationStartTime: new FormControl(0),
  //     registrationEndTime: new FormControl(0),
  //     tournamentStartTime: new FormControl(0)
  //   });
  // }
  //
  // get tournamentModeControls() {
  //   console.log(this.tournamentCreateForm.get('tournamentMode'))
  //   return (this.tournamentCreateForm.get('tournamentMode') as FormArray).controls;
  // }


}
