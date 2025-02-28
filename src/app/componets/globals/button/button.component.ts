import {Component, Input} from '@angular/core';
import {AuthService} from '../../../services/http.authService';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone: true,
  providers: [AuthService]
})
export class ButtonComponent {
  constructor(private authService:AuthService) {
  }
  @Input() title:string =""
  @Input() url:string = "/"

}
