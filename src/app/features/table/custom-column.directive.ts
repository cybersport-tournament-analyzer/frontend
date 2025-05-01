import {ContentChild, ContentChildren, Directive, ElementRef, Input, QueryList, TemplateRef} from '@angular/core';
import {StarDirective} from '../../directives/star.directive';

@Directive({
  standalone: true,
  selector: '[customHeaderCellDef]'
})
export class CustomHeaderCellDefDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
@Directive({
  standalone: true,
  selector: '[customCellDef]'
})
export class CustomCellDefDirective {
  constructor(public template: TemplateRef<any>) { }
  @ContentChild(StarDirective, {static: true })
  stars!: QueryList<StarDirective>;
}
@Directive({
  standalone: true,
  selector: '[appCustomColumn]'
})
export class CustomColumnDirective {
  @Input('customColumnDef') name!: string;

  public classes: string;
  constructor(public template: ElementRef<any>) {
    this.classes = this.template.nativeElement.className;

  }
  // Поиск шаблона для заголовка внутри колонки
  @ContentChild(CustomHeaderCellDefDirective, { static: true })
  headerCellDef!: CustomHeaderCellDefDirective;

  // Поиск шаблона для ячейки внутри колонки
  @ContentChild(CustomCellDefDirective, { static: true })
  cellDef!: CustomCellDefDirective;
  private stars: StarDirective[] = [];

  registerStar(star: StarDirective) {
    this.stars.push(star);
  }

  findMaxAndMark() {
    if (!this.stars.length) return;
    const maxValue = Math.max(...this.stars.map(s => s.value));
    this.stars.forEach(star => {
      if (star.value === maxValue) {
        star.markAsStar();
      }
    });
  }

}

