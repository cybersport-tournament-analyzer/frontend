import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TournamentService} from '../../services/tournament/tournament.service';
import {AuthService} from '../../services/http.authService';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {StepComponent} from '../../features/stepper/step/step.component';
import {StepperComponent} from '../../features/stepper/stepper.component';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {catchError, map, Observable, of, startWith, tap} from 'rxjs';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-team-registration',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    StepComponent,
    StepperComponent,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    AsyncPipe,
    JsonPipe,
    NgIf
  ],
  templateUrl: './team-registration.component.html',
  standalone: true,
  styleUrl: './team-registration.component.css'
})
export class TeamRegistrationComponent implements OnInit{
  @Input() mode!: string;
  @Input() tournamentId! : string

  @Input() substitutionsCount: number = 0;

  @Output() onSend :EventEmitter<boolean> = new EventEmitter<boolean>();

  form: FormGroup;
  allUsers: any[] = [];
  filteredUsers: Observable<any[]>[] = [];
  initialized = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private tournamentService:TournamentService
  ) {
    this.form = this.fb.group({
      teamName: [''],
      flag: ['RU'],
      inGameRole:[],
      creatorSteamId: [''],
      steamIds: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((data: any) => {
      this.form.get('creatorSteamId')?.setValue(data?.steamId);
    });

    this.userService.getAllUsers().subscribe((data: any) => {
      this.allUsers = data.content || [];
      this.tryInitialize();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.tryInitialize();
    }
  }


  displayFn = (user: any): string => {
    if (!user) return '';
    if (typeof user === 'string') {
      const found = this.allUsers.find(u => u.steamId === user);
      return found ? found.steamUsername : '';
    }
    return user.steamUsername;
  };

  private _filter(value: string): any[] {
    const filterValue = this._normalizeValue(value);
    return this.allUsers.filter(user =>
      this._normalizeValue(user.steamUsername).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
    // return (value || '').toLowerCase().replace(/\s/g, '');
  }
  onSubmit() {
    if (this.form.invalid) {
      console.log('RequiredError')
      this.form.markAllAsTouched();
      return;
    }
    console.log('Просмотр  данных:', this.form.value);

    const formValue = this.form.value;

    const count = Number(this.mode) - 1;

    const filteredSteamIds = formValue.steamIds
      .map((entry: any, index: number) => {
        if (index < count) return entry; // основные игроки — всегда включаем
        if (entry.steamId) return entry; // запасной игрок — включаем, если указан
        return null;
      })
      .filter(Boolean); // убираем null
    // const stagesReq= formValue.stages.map((item:any)=>{return {
    //   ...item,
    //   numberOfGroups: Number(item.numberOfGroups),
    //   teamsToAdvance: Number(item.teamsToAdvance),
    //   totalRounds: Number(item.totalRounds),
    // }})
    const payload = {

      teamName: formValue.teamName,
      flag: formValue.flag,
      inGameRole:formValue.inGameRole,
      creatorSteamId: formValue.creatorSteamId,

      players: filteredSteamIds
      // registrationStartTime: new Date(formValue.registrationStartTime).toISOString(),
      // registrationEndTime: new Date(formValue.registrationEndTime).toISOString(),
      // tournamentStartTime: new Date(formValue.tournamentStartTime).toISOString(),
      // stages: stagesReq,
      // teamsCount: Number(formValue.teamsCount),
      // substitutionsNumber: Number(formValue.substitutionsNumber)
    };

    console.log('Отправка данных:', payload);
    this.tournamentService.createTeamOnTournament(this.tournamentId, payload)
      .subscribe({
        next: (res) => {
          console.log("SUCCESS", res);
          this.onSend.emit(true);
        },
        error: (err) => {
          console.error("ERROR", err);
          this.onSend.emit(false);
        }
      });
  }
  private tryInitialize(): void {
    if (this.initialized) return;

    const count = Number(this.mode);
    if (!count || isNaN(count)) return;

    if (this.allUsers.length) {
      this.initPlayerFields(count);
      this.steamIds.controls.forEach((control, index) => {
        const group = control as FormGroup;
        const steamControl = group.get('steamId');
        const roleControl = group.get('inGameRole');

        if (index >= Number(this.mode) - 1) {
          steamControl?.valueChanges.subscribe((val) => {
            if (val) {
              roleControl?.setValidators(Validators.required);
            } else {
              roleControl?.clearValidators();
            }
            roleControl?.updateValueAndValidity();
          });
        }
      });

      this.initialized = true;
    }
  }
  public resetForm(): void {
    this.form.reset({
      creatorSteamId: this.form.get('creatorSteamId')?.value // сохраняем steamId пользователя
    });

    // Очищаем и переинициализируем поля игроков
    this.steamIds.clear();
    this.filteredUsers = [];
    this.initialized = false;
    this.tryInitialize();

    // Сбрасываем состояние формы
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }

  // initPlayerFields(count: number, substitutions: number): void {
  //   this.filteredUsers = [];
  //
  //   const totalPlayers = count - 1 + substitutions;
  //   for (let i = 0; i < totalPlayers; i++) {
  //     const control = this.fb.control('', Validators.required);
  //     this.steamIds.push(control);
  //
  //     this.filteredUsers.push(
  //       control.valueChanges.pipe(
  //         startWith(''),
  //         map(value => this._filter(value || ''))
  //       )
  //     );
  //   }
  // }
  initPlayerFields(count: number): void {
    this.filteredUsers = [];
    const totalPlayers = count - 1 + this.substitutionsCount;

    for (let i = 0; i < totalPlayers; i++) {
      const group = this.fb.group({
        steamId: ['', i < count - 1 ? Validators.required : []], // обязателен для основы
        inGameRole: ['', []], // валидатор позже добавим вручную
      });

      this.steamIds.push(group);

      this.filteredUsers.push(
        group.get('steamId')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        )
      );
    }
  }

  get steamIds(): FormArray {
    return this.form.get('steamIds') as FormArray;
  }

  onUserSelected(user: any, index: number): void {
    const group = this.steamIds.at(index) as FormGroup;
    group.get('steamId')?.setValue(user.steamId);
  }

  protected readonly Number = Number;
}
