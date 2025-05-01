import {Component, ContentChild, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-step',
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './step.component.html',
  standalone: true,
  styleUrl: './step.component.css'
})
export class StepComponent {

  @ContentChild('labelStep')
  labelStep!: TemplateRef<any>;
  @ContentChild('contentStep')
  contentStep!: TemplateRef<any>;

  @ContentChild('content')
  content!: TemplateRef<any>;

}
