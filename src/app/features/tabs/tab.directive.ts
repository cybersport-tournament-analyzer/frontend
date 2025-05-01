import {AfterViewInit, Directive, ElementRef, Input, TemplateRef} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appTab]'
})
export class TabDirective implements AfterViewInit{

  constructor(public template:TemplateRef<any>) { }

  @Input("appTab")
  title:string=""
  ngAfterViewInit(): void {

  }
}
