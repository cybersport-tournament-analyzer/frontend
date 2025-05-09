import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {ButtonComponent} from '../globals/button/button.component';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {TagComponent} from '../globals/tag/tag.component';
import {TimePipe} from '../../pipes/time.pipe';
import {UserDto} from '../../interfaces/user-dto';
import {ComparePlayersComponent} from '../../features/compare-players/compare-players.component';
import {JsonPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-info-series-block-with-compare',
  imports: [
    ButtonComponent,
    ImgURLPipe,
    TagComponent,
    TimePipe,
    ComparePlayersComponent,
    JsonPipe,
    NgClass
  ],
  templateUrl: './info-series-block-with-compare.component.html',
  standalone: true,
  styleUrl: './info-series-block-with-compare.component.css'
})
export class InfoSeriesBlockWithCompareComponent {

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


  selectedUsers:any[]=[]
  selectedUsersId:any[]=[]
  isSelected(id:string){
    return this.selectedUsersId.includes(id)
  }
  selectUser(user:any,event:any) {

    if (this.selectedUsers[0]?.steam_id_64 != user.playerSteamId && this.selectedUsers[1]?.steam_id_64 != user.playerSteamId){
      this.selectedUsers.push({
        steam_id_64:user.playerSteamId,
        nickname_override : user.playerUsername
      })
      this.selectedUsersId.push(user.playerSteamId)
    }else{
      this.selectedUsers=this.selectedUsers.filter((item:any)=>item.steam_id_64 != user.playerSteamId)
      this.selectedUsersId=this.selectedUsersId.filter((item:any)=>item != user.playerSteamId)
    }

    console.log(this.selectedUsers)
  }
}
