import { Component } from '@angular/core';
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
    JsonPipe
  ],
  templateUrl: './tournament-bracket.component.html',
  standalone: true,
  styleUrl: './tournament-bracket.component.css'
})
export class TournamentBracketComponent {
  list:any=[
    [
      [{
    "seed":1,
      "name":"team1",
      "score":2
    },
      {
        "seed":1,
        "name":"team2",
        "score":2
      },],[
      {
        "seed":1,
        "name":"team3",
        "score":2
      },
      {
        "seed":1,
        "name":"team4",
        "score":2
      },],
      [
      {
        "seed":1,
        "name":"team5",
        "score":2
      },
      {
        "seed":1,
        "name":"team6",
        "score":2
      }],
      [
        {
          "seed":1,
          "name":"team7",
          "score":2
        },
        {
          "seed":1,
          "name":"team7",
          "score":2
        }],


    ],


    [[{
      "seed":1,
      "name":"Orlando Jetsetters",
      "score":2
    },
      {
        "seed":1,
        "name":"D.C. Senators",
        "score":2
      }],[
      {
        "seed":1,
        "name":"Orlando Jetsetters",
        "score":2
      },
      {
        "seed":1,
        "name":"D.C. Senators",
        "score":2
      }]],



    [[{
      "seed":1,
      "name":"team1",
      "score":2
    },
      {
        "seed":1,
        "name":"team2",
        "score":2
      }]]
  ]

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
