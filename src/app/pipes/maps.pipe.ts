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
      case "workshop/3101654056":
        return "AIM_Fist"
      case "workshop/3125119625":
        return "AIM_Nuke_hall"
      case "workshop/3084291314":
        return "AIM_Map"
      case "workshop/3309764985":
        return "AIM_Vertigo"
      case "workshop/3090032979":
        return "AIM_Case"


      case "de_vertigo":
        return "Vertigo"
      case "de_inferno":
        return "Inferno"
      case "de_overpass":
        return "Overpass"
      case "de_nuke":
        return "Nuke"
      case "workshop/3347582685":
        return "Dust II"
      case "workshop/3347606169":
        return "Mirage"
      case "workshop/3408016560":
        return "Train"


      case "de_dust2":
        return "Dust II"

      case "de_mirage":
        return "Mirage"

      case "de_ancient":
        return "Ancient"
      case "de_train":
        return "Train"
      case "de_anubis":
        return "Anubis"
      default:
        return "Карта"


    }
  }

}
