import {AfterContentInit, Component, ContentChild, ContentChildren, Input, QueryList} from '@angular/core';
import {ModalStepDirective} from './modal-step.directive';
import {JsonPipe, NgTemplateOutlet} from '@angular/common';
import {StepperComponent} from '../stepper/stepper.component';

@Component({
  selector: 'app-modal-window',
  imports: [
    ModalStepDirective,
    NgTemplateOutlet,
    JsonPipe,
    StepperComponent
  ],
  templateUrl: './modal-window.component.html',
  standalone: true,
  styleUrl: './modal-window.component.css'
})
export class ModalWindowComponent implements AfterContentInit{
  @Input() isOn:boolean = false
  protected readonly close = close;


  closeWindow(){
    this.isOn=false

  }

  ngAfterContentInit(): void {
  }
}
