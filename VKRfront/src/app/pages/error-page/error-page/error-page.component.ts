import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {
  showToast:boolean = false
  name = "name"
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

}
