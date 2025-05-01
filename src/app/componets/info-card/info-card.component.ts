import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding, Input,
  QueryList,
  TemplateRef
} from '@angular/core';
import {NgClass, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-info-card',
  imports: [
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './info-card.component.html',
  standalone: true,
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent implements AfterContentInit{
  @ContentChild("iconTemplate")
  icon:TemplateRef<any>|null = null

  @Input() cardClass = '';

  @Input()
  clickFunction=()=>{console.log("click")}
  ngAfterContentInit(): void {
    // console.log(this.icon)
    // console.log("info card")
  }

}
