import { Component } from '@angular/core';
import {ButtonComponent} from '../globals/button/button.component';
import {AuthService} from '../../services/http.authService';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService ) {
  }
  getByRoute(){

    this.authService.login().subscribe({next: (data: any) => {
        console.log("hui")
        console.log(data.openIdUrl)
        window.location.href=data.openIdUrl
      }});
    // this.httpService.getAuth()
  }

}
