import {ContentChild, Directive, ElementRef, Input, TemplateRef} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[customHeaderCellDef]'
})
export class CustomHeaderCellDefDirective {
  constructor(public template: TemplateRef<any>) {
    console.log("aaa")
    console.log(template)
  }
}
@Directive({
  standalone: true,
  selector: '[customCellDef]'
})
export class CustomCellDefDirective {
  constructor(public template: TemplateRef<any>) { }
}
@Directive({
  standalone: true,
  selector: '[appCustomColumn]'
})
export class CustomColumnDirective {
  @Input('customColumnDef') name!: string;

  // Поиск шаблона для заголовка внутри колонки
  @ContentChild(CustomHeaderCellDefDirective, { static: true })
  headerCellDef!: CustomHeaderCellDefDirective;

  // Поиск шаблона для ячейки внутри колонки
  @ContentChild(CustomCellDefDirective, { static: true })
  cellDef!: CustomCellDefDirective;
}

