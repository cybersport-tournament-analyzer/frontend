import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
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
  @Input() isOn: boolean = false;
  @Output() isOnChange = new EventEmitter<boolean>();

// При закрытии модалки
  close() {
    this.isOn = false;
    this.isOnChange.emit(this.isOn);
  }


  onClose():any {
    this.isOnChange.emit();
  }

  ngAfterContentInit(): void {
  }


}
