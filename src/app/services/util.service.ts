import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  formatDateToRussianGMT3(isoString:any) {
    const date = new Date(isoString);

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
  getTimeRemaining(targetDate:any) {
    const now = new Date(); // Текущая дата
    //@ts-ignore
    const diff = targetDate - now; // Разница в миллисекундах

    if (diff <= 0) {
      return "Время истекло";
    }

    // Разбиваем разницу на компоненты
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Собираем строку
    return `${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`;
  }
  formatTimeRemaining(targetISO:Date) {
    const targetDate = new Date(targetISO);
    console.log(targetDate)
    const now = new Date();
    console.log(now)

    // Корректируем целевую дату на GMT+3

    // Вычисляем разницу

    const diff = targetDate.getTime() - now.getTime();
    console.log("diff")
    console.log(diff)
    if (diff <= 0) return "Событие началось";

    // Получаем компоненты времени
    const hoursDiff = Math.floor(diff / 3600000);
    const minutesDiff = Math.floor((diff % 3600000) / 60000);

    // Форматируем оставшееся время
    let timePart;
    if (hoursDiff >= 1) {
      timePart = `Через ${hoursDiff} ${this.pluralize(hoursDiff, ["час", "часа", "часов"])}`;
    } else {
      timePart = `Через ${minutesDiff} ${this.pluralize(minutesDiff, ["минуту", "минуты", "минут"])}`;
    }

    // Форматируем время события
    // const time = `${targetDate.getUTCHours().toString().padStart(2, "0")}:${targetDate.getUTCMinutes().toString().padStart(2, "0")}`;

    // return `${timePart}, ${time}`;
    return `${timePart}, `;
  }

// Вспомогательная функция для склонения
  pluralize(n:any, words:any) {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[
      n % 100 > 4 && n % 100 < 20 ? 2 : cases[Math.min(n % 10, 5)]
      ];
  }
}
