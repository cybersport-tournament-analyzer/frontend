import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {TagComponent} from '../globals/tag/tag.component';
import {JsonPipe} from '@angular/common';
import {UserDto} from '../../interfaces/user-dto';
import {ButtonComponent} from '../globals/button/button.component';
import {MapsPipe} from '../../pipes/maps.pipe';

@Component({
  selector: 'app-info-match-block',
  imports: [
    ImgURLPipe,
    TagComponent,
    JsonPipe,
    ButtonComponent,
    MapsPipe
  ],
  templateUrl: './info-match-block.component.html',
  standalone: true,
  styleUrl: './info-match-block.component.css'
})
export class InfoMatchBlockComponent implements OnChanges {
 @Input()
  data:any|null = null
  @Input() internalData: any;

  public  statsMatch : any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['internalData'] && changes['internalData'].currentValue) {
      this.processStats(changes['internalData'].currentValue);
    }
  }

  private processStats(data: any) {
    // Преобразуй или скопируй данные, если нужно
    this.statsMatch = { ...data };
    // Если включён OnPush, можешь вручную вызвать ChangeDetectorRef.detectChanges()
  }
  @Input()
  user:UserDto|null=null

  @Output() changeStatusClicked = new EventEmitter<boolean>();

  onButtonClick(ready: boolean) {
    this.changeStatusClicked.emit(ready);
  }
  protected readonly Object:any = Object;
  protected readonly Number = Number;

}
