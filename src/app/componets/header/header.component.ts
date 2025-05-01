import {Component, OnInit, signal} from '@angular/core';
import {ButtonComponent} from '../globals/button/button.component';
import {AuthService} from '../../services/http.authService';
import {Router, RouterLink} from '@angular/router';
import {ModalWindowComponent} from '../../features/modal-window/modal-window.component';
import {StepComponent} from '../../features/stepper/step/step.component';
import {StepperComponent} from '../../features/stepper/stepper.component';
import {TournamentCreateComponent} from '../tournament-create/tournament-create.component';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    ButtonComponent,
    RouterLink,
    ModalWindowComponent,
    StepComponent,
    StepperComponent,
    TournamentCreateComponent,
    ImgURLPipe,
    JsonPipe
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
   public user:any=signal(null)
  constructor(private authService: AuthService, private router:Router) {
  }
  goHome(){
    this.router.navigate(["/home"])
  }





  isOpen = false;

  onModal() {
    this.isOpen = true;
  }
  isLogin(){
    return this.authService.isLoggedIn()
  }
  // getUserInfo(){
  //   console.log("запрос пользователя для header")
  //   return this.authService.getInfo().subscribe()
  // }



  getByRoute(){

    this.authService.login().subscribe({next: (data: any) => {
        console.log("hui")
        console.log(data.openIdUrl)
        if (data.openIdUrl){
          window.location.href=data.openIdUrl
        }
        // window.location.href=data.openIdUrl
      }});
    // this.httpService.getAuth()
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((data:any)=>{
      this.user.set(data)
      console.log("in HEADER")
      console.log(this.user())
    })
  }
  logout(){
    this.authService.logout().subscribe((data:any)=>{
      console.log('Logout завершился, success:', data);
      this.router.navigate(['home'])
    })

  }

}
