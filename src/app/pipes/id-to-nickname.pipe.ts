import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'idToNickname'
})
export class IdToNicknamePipe implements PipeTransform {

  transform(value: string, config: { [key: string]: string }): string {
    return config[value] || value;  // если ID не найден в конфиге, возвращаем сам ID
  }

}
