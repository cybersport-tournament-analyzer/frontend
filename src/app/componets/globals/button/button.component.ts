import {Component, Input} from '@angular/core';
import {AuthService} from '../../../services/http.authService';
import {RouterLink} from '@angular/router';
import {ImgURLPipe} from '../../../pipes/img-url.pipe';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    RouterLink,
    ImgURLPipe,
    NgClass
  ],
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
  @Input()
  iconURL: string | null=null;
  @Input()
  classButton=''

}
