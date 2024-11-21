import {Component, Input} from '@angular/core';
import {HttpService} from '../../../http.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  providers:[HttpService]
})
export class ButtonComponent {
  constructor(private httpService:HttpService) {
  }
  @Input() title:string =""
  @Input() url:string = "/"
  getByRoute(){
    this.httpService.getAuth()
  }
}
