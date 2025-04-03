import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appModalStep]'
})
export class ModalStepDirective {

  @Input() stepTitle: string = '';
  constructor(public template: TemplateRef<any|null>) {}

}
