import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'tournamentStatus'
})
export class TournamentStatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    switch (value){
      case 'ACTIVE':
        return 'Идет'
      case 'NOT_STARTED':
        return 'Создание'
      case 'REGISTRATION':
        return 'Регистрация'
      case  'REGISTRATION_ENDED':
        return 'Регистрация завершена'
      case  'COMPLETED':
        return 'Завершен'
      default:
        return "Идет"
    }
  }

}
