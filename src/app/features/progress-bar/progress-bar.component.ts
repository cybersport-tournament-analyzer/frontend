import {Component, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  imports: [
    DecimalPipe
  ],
  templateUrl: './progress-bar.component.html',
  standalone: true,
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input()
  value1:number=0
  @Input()
  value2:number=0
  @Input()
  progressBarClass=""
  _val1!:number
  _val2!:number

  get progressWidth(): number {
    this._val1=Math.abs(Number(this.value1))
    this._val2 = Math.abs( Number(this.value2))
    if (this._val1 ==0 &&  this._val2 ==0) return 50;
    // if (this._val1 == this._val2 ) return this._val1;

    if (this._val1 + this._val2 === 0) return 0;

    return (this._val1 / (this._val1 + this._val2)) * 100;
  }

}
