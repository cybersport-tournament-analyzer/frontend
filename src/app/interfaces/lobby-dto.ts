import {PickBanDto} from './pick-ban-dto';

export interface LobbyDto {
  id: string,
  mode: string,
  format: string,
  link:string,
  team1: any,
  team2: any,
  pickBanSession: PickBanDto,
  matches:any[]

}
