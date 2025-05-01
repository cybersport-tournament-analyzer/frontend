import {
  AfterContentInit, AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TabDirective} from './tab.directive';
import {NgClass, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-tabs',
  imports: [
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './tabs.component.html',
  standalone: true,
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit,AfterViewInit{
  @ContentChildren(TabDirective)
  tabs!:QueryList<TabDirective>

  selectedElement :any  = null

  ngAfterContentInit(): void {

    this.selectedElement=this.tabs.get(0)
    console.log(this.selectedElement)
  }

  selectTab(element:TabDirective) {
    this.selectedElement=element
  }

  showSpacer = false;

  @ViewChildren('tabItem') tabItems!: QueryList<ElementRef>;
  @ViewChild('parentContainer') parentContainer!: ElementRef;

  ngAfterViewInit() {
    this.calculateSpacer();
    this.tabItems.changes.subscribe(() => this.calculateSpacer());
    window.addEventListener('resize', () => this.calculateSpacer());
  }

  calculateSpacer() {
    setTimeout(() => {
      if (!this.parentContainer?.nativeElement || !this.tabItems) return;

      const parentWidth = this.parentContainer.nativeElement.offsetWidth;
      let totalTabsWidth = 0;

      this.tabItems.forEach(item => {
        totalTabsWidth += item.nativeElement.offsetWidth;
      });

      this.showSpacer = totalTabsWidth < parentWidth;
    });
  }
}
