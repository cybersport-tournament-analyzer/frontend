import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TournamentBracketComponent} from '../../../features/tournament-bracket/tournament-bracket.component';
import {ModalWindowComponent} from '../../../features/modal-window/modal-window.component';
import {ModalStepDirective} from '../../../features/modal-window/modal-step.directive';
import {StepperComponent} from '../../../features/stepper/stepper.component';
import {StepComponent} from '../../../features/stepper/step/step.component';
import {TableComponent} from '../../../features/table/table.component';
import {
  CustomCellDefDirective,
  CustomColumnDirective,
  CustomHeaderCellDefDirective
} from '../../../features/table/custom-column.directive';
import {JsonPipe} from '@angular/common';


@Component({
  selector: 'app-error-page',
  imports: [FormsModule, TournamentBracketComponent, ModalWindowComponent, ModalStepDirective, StepperComponent, StepComponent, TableComponent, CustomColumnDirective, CustomHeaderCellDefDirective, CustomCellDefDirective, JsonPipe],
  templateUrl: './error-page.component.html',
  standalone: true,
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  showToast:boolean = false
  name = "name"
  isOpen:boolean = false;
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast = true;
      // Скрываем уведомление через 2.5 секунды
      setTimeout(() => {
        this.showToast = false;
      }, 2500);
    }).catch(err => {
      console.error('Ошибка копирования:', err);
    });
  }

  onModal() {
    this.isOpen = !this.isOpen
  }

}
