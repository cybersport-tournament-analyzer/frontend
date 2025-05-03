import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const date = new Date(value);

    // Получаем UTC компоненты и добавляем 3 часа для GMT+3
    const utcHours = date.getUTCHours() + 3;
    const adjustedDate = new Date(date);
    adjustedDate.setUTCHours(utcHours);

    // Русские названия
    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = [
      'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
      'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];

    // Форматируем компоненты
    const dayOfWeek = weekdays[adjustedDate.getUTCDay()];
    const monthName = months[adjustedDate.getUTCMonth()];
    const day = adjustedDate.getUTCDate();
    const hours = adjustedDate.getUTCHours().toString().padStart(2, '0');
    const minutes = adjustedDate.getUTCMinutes().toString().padStart(2, '0');

    return `${dayOfWeek}, ${monthName} ${day}, ${hours}:${minutes} GMT+3`;
  }

}
