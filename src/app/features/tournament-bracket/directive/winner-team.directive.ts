import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appWinnerTeam]'
})
export class WinnerTeamDirective implements AfterViewInit {
  @Input('appWinnerTeam') status =false;

  constructor(private el :ElementRef) {

    // el.nativeElement.children[3].style = '#03d9ce'

  }

  ngAfterViewInit(): void {
    if(this.status){
      this.el.nativeElement.style.backgroundColor = '#232c36'
      this.el.nativeElement.style.color = '#a9a1a4'
      this.el.nativeElement.style.borderColor = '#36404e'
      this.el.nativeElement.style.zIndex =1
      this.el.nativeElement.lastChild.style.color="#03d9ce"
    }

  }


}
