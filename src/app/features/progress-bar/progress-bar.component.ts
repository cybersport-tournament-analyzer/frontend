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

  get progressWidth(): number {
    if (this.value1 + this.value2 === 0) return 0;
    return (this.value1 / (this.value1 + this.value2)) * 100;
  }

}
