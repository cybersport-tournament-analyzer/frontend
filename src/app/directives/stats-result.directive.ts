import {Directive, ElementRef, Input, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appStatsResult]'
})
export class StatsResultDirective {

  @Input('appStatsResult')elo!:number
  constructor(private element:ElementRef, private renderer: Renderer2) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.elo>=80){

      this.renderer.addClass(this.element.nativeElement, 'text-highRates');
    }
    else if (this.elo<40){
      this.renderer.addClass(this.element.nativeElement, 'text-lowRates');
    }else{
      this.renderer.addClass(this.element.nativeElement, 'text-mediumRates');
    }
  }

}
