import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {AuthService} from '../../services/http.authService';
import {WebSocketService} from '../../services/web-socket.service';
import {AsyncPipe, DatePipe, JsonPipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {UserDto} from '../../interfaces/user-dto';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TournamentBracketComponent} from '../../features/tournament-bracket/tournament-bracket.component';
import {TournamentService} from '../../services/tournament/tournament.service';
import {Init} from 'node:v8';
import {environment} from '../../../environments/environment';
import {InfoCardComponent} from '../../componets/info-card/info-card.component';
import {TournamentStatusPipe} from '../../pipes/tournament-status.pipe';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {SpinnerComponent} from '../../features/spinner/spinner.component';


@Component({
  selector: 'app-main-page',
  imports: [
    JsonPipe,
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,
    TournamentBracketComponent,
    InfoCardComponent,
    TournamentStatusPipe,
    DatePipe,
    ImgURLPipe,
    SpinnerComponent
  ],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{

  name = "Tom";
  lobbys$!:Observable<any[]> ;
  lobby:WritableSignal<any[]>=signal([]);
  user:WritableSignal<UserDto|null>=signal(null)
  form = new FormGroup({
    format : new FormControl(null),
    mode : new FormControl(null)
  })
  tournaments:any

  constructor(private authService:AuthService, private socketService:WebSocketService, private tournamentService:TournamentService, private  router :Router) {
    this.lobbys$=this.socketService.getLobbys();
    // this.authService.getInfo().subscribe(({attributes}:any)=>{
    //   console.log("At",attributes)
    //   this.user.set(this.authService.getUser())
    // })

      // (async () => {
      //   const userData = await this.authService.getUser();
      //   this.user.set(userData); // здесь уже обычный объект
      //   console.log("User:", this.user());
      // })();
    // this.authService.getUser().subscribe(userData => this.user.set(userData));
    console.log("end const")

  }

  gatToken(){
    return this.authService.getJwtToken()
  }

  createLobby(id:any, form:any) {
    this.socketService.createLobby(id,form)
      .subscribe((data:any)=>{
        console.log(data)
         // @ts-ignore
        this.lobby.set(this.lobby().push(data['lobbyId']))
        })
  }


  submit() {
    this.createLobby(this.user()?.steamId,this.form.value)
  }

  ngOnInit(): void {
     this.tournamentService.getAllTournament().subscribe((data:any)=>{
       this.tournaments =data.content
    })
  }
  getLinkToTournament(tournamentId:string){
    return this.tournamentService.getLinkToTournament(tournamentId)
  }
  goToTournament(tournamentId:string){
    this.router.navigate([`/tournament/${tournamentId}`])
  }

  protected readonly environment = environment;
}
