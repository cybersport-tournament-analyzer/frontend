import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'maps'
})
export class MapsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    switch (value) {
      case "workshop/3073259920":
        return "AIM_Fake"
      case "workshop/3131775712":
        return "AIM_Redline"
        break;
      case "workshop/3101654056":
        return "AIM_Fist"
        break;
      case "workshop/3125119625":
        return "AIM_Nuke_hall"
        break;
      case "workshop/3084291314":
        return "AIM_Map"
        break;
      case "workshop/3309764985":
        return "AIM_Vertigo"
        break;
      case "workshop/3090032979":
        return "AIM_Case"
        break;


      case "de_vertigo":
        return "Vertigo"
        break;
      case "de_inferno":
        return "Inferno"
        break;
      case "de_overpass":
        return "Overpass"
        break;
      case "de_nuke":
        return "Nuke"
        break;
      case "workshop/3347582685":
        return "Dust II"
        break;
      case "workshop/3347606169":
        return "Mirage"
        break;
      case "workshop/3408016560":
        return "Train"
        break;


      case "de_dust2":
        return "Dust II"
        break;
      case "de_inferno":
        return "Inferno"
        break;
      case "de_mirage":
        return "Mirage"
        break;
      case "de_nuke":
        return "Nuke"
        break;
      case "de_ancient":
        return "Ancient"
        break;
      case "de_train":
        return "Train"
        break;
      case "de_anubis":
        return "Anubis"
        break;
      default:
        return "Карта"


    }
  }

}
