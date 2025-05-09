import {Component, Input} from '@angular/core';
import {JsonPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop, CdkDragPlaceholder, CdkDragPreview,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {WinnerTeamDirective} from './directive/winner-team.directive';
import {InfoCardComponent} from '../../componets/info-card/info-card.component';
import {ImgURLPipe} from '../../pipes/img-url.pipe';

@Component({
  selector: 'app-tournament-bracket',
  imports: [
    NgClass,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    CdkDragPreview,
    CdkDragPlaceholder,
    WinnerTeamDirective,
    NgOptimizedImage,
    JsonPipe,
    InfoCardComponent,
    ImgURLPipe
  ],
  templateUrl: './tournament-bracket.component.html',
  standalone: true,
  styleUrl: './tournament-bracket.component.css'
})
export class TournamentBracketComponent {
  @Input()
  list:any


  drop(event: CdkDragDrop<string[]>) {
    // console.log(event.previousContainer === event.container)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,)
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.currentIndex+1,
        event.previousIndex,
      );
      console.log("------")
      console.log(event.container.data,
        event.previousContainer.data,
        event.currentIndex+1,
        event.previousIndex,)
    }

    // moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    // transferArrayItem()
  }

}
// list:any=[
//   [
//     [
//       {
//         "score": 2,
//         "seed": 1,
//         "name": "Vlad"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//     [
//       {
//         "score": 2,
//         "seed": 2,
//         "name": "Rodya"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//     [
//       {
//         "score": 2,
//         "seed": 3,
//         "name": "Sasha"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//     [
//       {
//         "score": 0,
//         "seed": 4,
//         "name": "Diana"
//       },
//       {
//         "score": 0,
//         "seed": 5,
//         "name": "Nika"
//       }
//     ],
//
//   ],
//   [
//     [
//       {
//         "score": 0,
//         "seed": 1,
//         "name": "Vlad"
//       },
//       {
//         "score": 0,
//         "seed": 2,
//         "name": "Rodya"
//       }
//     ],
//     [
//       {
//         "score": 0,
//         "seed": 3,
//         "name": "Sasha"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//   ],
//   [
//     [
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//   ],
// ]
// list:any=[
//   [
//     [
//       {
//         "score": 2,
//         "seed": 1,
//         "name": "Vlad"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//     [
//       {
//         "score": 2,
//         "seed": 2,
//         "name": "Rodya"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//     [
//       {
//         "score": 2,
//         "seed": 3,
//         "name": "Sasha"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//     [
//       {
//         "score": 0,
//         "seed": 4,
//         "name": "Diana"
//       },
//       {
//         "score": 0,
//         "seed": 5,
//         "name": "Nika"
//       }
//     ],[
//     {
//       "score": 2,
//       "seed": 1,
//       "name": "Vlad"
//     },
//     {
//       "score": 0,
//       "seed": 0,
//       "name": null
//     }
//   ],
//     [
//       {
//         "score": 2,
//         "seed": 2,
//         "name": "Rodya"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//     [
//       {
//         "score": 2,
//         "seed": 3,
//         "name": "Sasha"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//     [
//       {
//         "score": 0,
//         "seed": 4,
//         "name": "Diana"
//       },
//       {
//         "score": 0,
//         "seed": 5,
//         "name": "Nika"
//       }
//     ]
//   ],
//   [
//     [
//       {
//         "score": 0,
//         "seed": 1,
//         "name": "Vlad"
//       },
//       {
//         "score": 0,
//         "seed": 2,
//         "name": "Rodya"
//       }
//     ],
//     [
//       {
//         "score": 0,
//         "seed": 3,
//         "name": "Sasha"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],[
//     {
//       "score": 0,
//       "seed": 1,
//       "name": "Vlad"
//     },
//     {
//       "score": 0,
//       "seed": 2,
//       "name": "Rodya"
//     }
//   ],
//     [
//       {
//         "score": 0,
//         "seed": 3,
//         "name": "Sasha"
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ]
//   ],
//   [
//     [
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ],
//     [
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       },
//       {
//         "score": 0,
//         "seed": 0,
//         "name": null
//       }
//     ]
//     // [
//     //   {
//     //     "score": 0,
//     //     "seed": 0,
//     //     "name": null
//     //   },
//     //   {
//     //     "score": 0,
//     //     "seed": 0,
//     //     "name": null
//     //   }
//     // ]
//   ],[[
//     {
//       "score": 0,
//       "seed": 0,
//       "name": null
//     },
//     {
//       "score": 0,
//       "seed": 0,
//       "name": null
//     }
//   ]]
// ]
