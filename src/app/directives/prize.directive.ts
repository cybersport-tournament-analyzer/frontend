import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appPrize]'
})
export class PrizeDirective implements OnChanges  {

  @Input('appPrize')elo!:number
  constructor(private element:ElementRef, private renderer: Renderer2) {

  }
  ngOnChanges(changes: SimpleChanges): void {
      if(this.elo>=80){

        this.renderer.addClass(this.element.nativeElement, 'text-highRates');
      }
      else if (this.elo<0){
        this.renderer.addClass(this.element.nativeElement, 'text-lowRates');
      }else{
        this.renderer.addClass(this.element.nativeElement, 'text-mediumRates');
      }
  }



}
