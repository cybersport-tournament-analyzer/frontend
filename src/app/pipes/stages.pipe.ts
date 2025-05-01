import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'stages'
})
export class StagesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value){
      case 'Groups':
        return 'Группа'
      case 'Single Elimination':
        return 'Плей-офф на вылет '
      default:
        return 'Этап'
    }
  }

}
