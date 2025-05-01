import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'imgURL'
})
export class ImgURLPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return "../../../assets/"+value;
  }

}
