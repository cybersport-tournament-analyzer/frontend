import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';
import {JsonPipe, NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {ModalStepDirective} from '../modal-window/modal-step.directive';
import {StepComponent} from './step/step.component';
import {ButtonComponent} from '../../componets/globals/button/button.component';

@Component({
  selector: 'app-stepper',
  imports: [
    NgTemplateOutlet,
    StepComponent,
    ModalStepDirective,
    JsonPipe,
    NgClass,
    NgIf,
    ButtonComponent
  ],
  templateUrl: './stepper.component.html',
  standalone: true,
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements AfterContentInit{
  @ContentChildren(StepComponent)
  steps! : QueryList<StepComponent>


  @Input() linear: boolean = false;

  currentStep = 0;

  @Input()
  endFunction!:any

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previous() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }


  ngAfterContentInit(): void {
    console.log("steps")
    console.log(this.steps)
  }

  end() {
    this.endFunction()
  }
}
