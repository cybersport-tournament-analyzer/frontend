import {Directive, ElementRef, Host, Input, Optional, Renderer2} from '@angular/core';
import {CustomColumnDirective} from '../features/table/custom-column.directive';

@Directive({
  standalone: true,
  selector: '[appStar]'
})
export class StarDirective {

  @Input('appStar') value!: number; // Значение для сравнения

  constructor(
    private el: ElementRef<HTMLElement>,
    @Optional() @Host() private column: CustomColumnDirective
  ) {}

  ngAfterViewInit(): void {
    if (this.column) {
      this.column.registerStar(this);
    }
  }

  markAsStar() {
    const img = document.createElement('img');
    img.src = '../../../assets/Star.svg'; // путь к твоему изображению
    img.alt = 'Star';
    img.classList.add('w-[16px]', 'h-[16px]', 'inline-block',); // Tailwind или свои классы

    this.el.nativeElement.appendChild(img);
  }

}
