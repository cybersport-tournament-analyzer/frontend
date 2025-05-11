import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray, transferArrayItem
} from '@angular/cdk/drag-drop';
import {ImgURLPipe} from '../../pipes/img-url.pipe';
import {WinnerTeamDirective} from '../tournament-bracket/directive/winner-team.directive';
import {JsonPipe, NgIf} from '@angular/common';
import {match} from 'node:assert';

interface Team {
  score: number;
  seed: number;
  name: string | null;
}
@Component({
  selector: 'app-tournament-bracket-prediction',
  imports: [
    CdkDropList,
    ImgURLPipe,
    WinnerTeamDirective,
    NgIf,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropListGroup,
    JsonPipe
  ],
  templateUrl: './tournament-bracket-prediction.component.html',
  standalone: true,
  styleUrl: './tournament-bracket-prediction.component.css'
})
export class TournamentBracketPredictionComponent implements OnInit, OnChanges{



  @Input() list: Team[][][] = [
    [
      [
        {
          "score": 2,
          "seed": 1,
          "name": "Vlad"
        },
        {
          "score": 0,
          "seed": 0,
          "name": "aaaa"
        }
      ],
      [
        {
          "score": 2,
          "seed": 2,
          "name": "Rodya"
        },
        {
          "score": 0,
          "seed": 0,
          "name": "vvvvv"
        }
      ],
      [
        {
          "score": 2,
          "seed": 3,
          "name": "Sasha"
        },
        {
          "score": 0,
          "seed": 0,
          "name": "xcccc"
        }
      ],
      [
        {
          "score": 0,
          "seed": 4,
          "name": "Diana"
        },
        {
          "score": 0,
          "seed": 5,
          "name": "Nika"
        }
      ],
    ],
  ];

  ngOnInit() {
    // Инициализируем пустые раунды для следующих колонок
    this.initializeEmptyRounds();
  }

  private initializeEmptyRounds() {
    const firstRoundMatches = this.list[0].length;
    const totalRounds = Math.log2(firstRoundMatches * 2); // Вычисляем общее количество раундов

    // Создаем пустые колонки для следующих раундов
    for (let round = 1; round < totalRounds; round++) {
      const matchesInRound = Math.max(1, Math.ceil(firstRoundMatches / Math.pow(2, round)));
      const newRound: Team[][] = [];

      for (let i = 0; i < matchesInRound; i++) {
        newRound.push([
          { score: 0, seed: 0, name: null },
          { score: 0, seed: 0, name: null }
        ]);
      }

      this.list.push(newRound);
    }
  }

  // Проверяем, можно ли перетаскивать команду (только непустые команды)
  canDrag(team: Team): boolean {
    return team.name !== null;
  }

  // Можно ли бросить команду в этот контейнер (только если место пустое)
  canDrop(team: Team): boolean {
    return team.name === null;
  }

  // Обработка события перетаскивания
  // drop(event: CdkDragDrop<Team[]>) {
  //   if (event.previousContainer === event.container) {
  //     // Если перетаскивание внутри одного контейнера
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     console.log("Если целевая позиция не пуста, отменяем перетаскивание")
  //     // Если целевая позиция не пуста, отменяем перетаскивание
  //     const targetTeam = event.container.data[event.currentIndex];
  //     console.log(targetTeam)
  //     if (targetTeam.name !== null) {
  //       return;
  //     }
  //
  //     // Создаем копию команды для нового места
  //     const sourceTeam = event.previousContainer.data[event.previousIndex];
  //     const teamCopy: Team = {
  //       name: sourceTeam.name,
  //       score: 0, // Сбрасываем счет для нового раунда
  //       seed: sourceTeam.seed
  //     };
  //
  //     // Заменяем пустую команду в целевом контейнере на копию
  //     event.container.data[event.currentIndex] = teamCopy;
  //   }
  // }

  // drop(event: CdkDragDrop<Team[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     const targetTeam = event.container.data[event.currentIndex];
  //     if (targetTeam.name !== null) {
  //       return;
  //     }
  //
  //     const sourceTeam = event.previousContainer.data[event.previousIndex];
  //     const teamCopy: Team = {
  //       name: sourceTeam.name,
  //       score: 0,
  //       seed: sourceTeam.seed
  //     };
  //
  //     event.container.data[event.currentIndex] = teamCopy;
  //
  //     // Удалим из всех следующих раундов такую же команду
  //     const currentRoundIndex = this.getColumnIndexByDropListId(event.container.id);
  //     this.removeTeamFromNextRounds(teamCopy.seed, currentRoundIndex);
  //   }
  // }

  drop(event: CdkDragDrop<Team[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const targetTeam = event.container.data[event.currentIndex];
      if (targetTeam.name !== null) {
        return;
      }

      // Получаем координаты предыдущего и текущего контейнера
      const source = this.getDropListCoords(event.previousContainer.id);
      const target = this.getDropListCoords(event.container.id);

      // Ограничение на валидные перемещения
      if (!this.isValidDrop(source, target)) {
        console.log("Недопустимое перемещение");
        return;
      }

      const sourceTeam = event.previousContainer.data[event.previousIndex];
      const teamCopy: Team = {
        name: sourceTeam.name,
        score: 0,
        seed: sourceTeam.seed
      };

      event.container.data[event.currentIndex] = teamCopy;

      // Удаляем из последующих раундов
      this.removeTeamFromNextRounds(teamCopy.seed, target.columnIndex);
    }
  }

  private getDropListCoords(dropListId: string): { columnIndex: number, matchIndex: number } {
    const parts = dropListId.split('-');
    return {
      columnIndex: parseInt(parts[2], 10),
      matchIndex: parseInt(parts[3], 10)
    };
  }

  private isValidDrop(
    source: { columnIndex: number; matchIndex: number },
    target: { columnIndex: number; matchIndex: number }
  ): boolean {
    // 1. Можно перемещать только в следующий раунд
    if (target.columnIndex !== source.columnIndex + 1) {
      return false;
    }

    const groupSize = 2; // 2 матча → 1
    const validSourceMatchStart = target.matchIndex * groupSize;
    const validSourceMatchEnd = validSourceMatchStart + groupSize - 1;

    // 2. Проверяем, что source.matchIndex в пределах допустимого диапазона
    if (
      source.matchIndex < validSourceMatchStart ||
      source.matchIndex > validSourceMatchEnd
    ) {
      return false;
    }

    // 3. Проверка: в target-матче уже есть команда из того же source.matchIndex
    const targetMatch = this.list[target.columnIndex][target.matchIndex];

    for (const team of targetMatch) {
      if (team.name !== null) {
        const teamSeed = team.seed;

        // Получаем исходный матч этой команды
        const originalMatchIndex = this.findMatchIndexBySeed(source.columnIndex, teamSeed);

        if (originalMatchIndex === source.matchIndex) {
          return false; // уже есть команда из этого матча
        }
      }
    }

    return true;
  }
  private findMatchIndexBySeed(roundIndex: number, seed: number): number | null {
    const round = this.list[roundIndex];
    for (let matchIndex = 0; matchIndex < round.length; matchIndex++) {
      const match = round[matchIndex];
      for (const team of match) {
        if (team.seed === seed) {
          return matchIndex;
        }
      }
    }
    return null;
  }



  // Получаем уникальный идентификатор для cdkDropList
  getDropListId(columnIndex: number, matchIndex: number): string {
    return `drop-list-${columnIndex}-${matchIndex}`;
  }

  // Получаем список допустимых контейнеров для перетаскивания
  getConnectedDropLists(columnIndex: number): string[] {
    // console.log(columnIndex)
    const connectedLists: string[] = [];
    const previousColumnIndex = columnIndex + 1;
    // Для первой колонки не нужны связанные списки
    if ((previousColumnIndex >=  this.list.length)) {
      // console.log("ALLLES")
      return connectedLists;
    }

    // Для остальных колонок связываем с предыдущей колонкой



    // console.log(this.list[previousColumnIndex])
    // if (previousColumnIndex< this.list[previousColumnIndex].length){
      for (let i = 0; i < this.list[previousColumnIndex].length; i++) {
        // console.log(previousColumnIndex, i)
        connectedLists.push(this.getDropListId(previousColumnIndex, i));
      }
      // console.log(connectedLists)

    // }
    return connectedLists;


  }

  // Проверяем, является ли команда победителем (для визуализации)
  isWinner(team: Team, opponent: Team): boolean {
    return team.name !== null && team.score > (opponent?.score || 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  private removeTeamFromNextRounds(seed: number, fromRound: number): void {
    for (let round = fromRound + 1; round < this.list.length; round++) {
      for (const match of this.list[round]) {
        for (let i = 0; i < match.length; i++) {
          if (match[i].seed === seed && match[i].name !== null) {
            match[i] = { name: null, score: 0, seed: 0 };
          }
        }
      }
    }
  }
  private getColumnIndexByDropListId(dropListId: string): number {
    const parts = dropListId.split('-');
    const columnIndex = parseInt(parts[2], 10);
    return columnIndex;
  }

  onRightClick(event: MouseEvent, columnIndex: number, matchIndex: number, teamIndex: number) {
    event.preventDefault();
    console.log('onRightClick')

    const team = this.list[columnIndex][matchIndex][teamIndex];

    if (team.name !== null) {
      const seedToRemove = team.seed;
      this.list[columnIndex][matchIndex][teamIndex] = { name: null, score: 0, seed: 0 };
      this.removeTeamFromNextRounds(seedToRemove, columnIndex);
    }
  }



}



// @Input()
// list: any;
//
// connectedDropLists: string[] = [];
//
// ngOnInit(): void {
//   this.generateConnectedDropLists();
// }
//
// ngOnChanges(changes: SimpleChanges): void {
//   if (changes['list']) {
//     this.generateConnectedDropLists();
//   }
// }
//
// generateConnectedDropLists() {
//   const result: string[] = [];
//   if (!this.list) return;
//
//   this.list.forEach((column: any[], colIndex: number) => {
//     column.forEach((_: any, matchIndex: number) => {
//       result.push(`match-${colIndex}-${matchIndex}`);
//     });
//   });
//
//   this.connectedDropLists = result;
//   console.log("connectedDropLists")
//   console.log(this.connectedDropLists)
// }
//
// drop(event: CdkDragDrop<any[]>) {
//   if (event.previousContainer !== event.container) {
//     const draggedTeam = structuredClone(event.previousContainer.data[event.previousIndex]);
//
//     const sourceColIndex = this.findColumnIndex(event.previousContainer.data);
//     const targetColIndex = this.findColumnIndex(event.container.data);
//
//     if (targetColIndex === sourceColIndex + 1) {
//       if (!event.container.data[event.currentIndex].name) {
//         event.container.data[event.currentIndex] = draggedTeam;
//       }
//     }
//   }
// }
//
// isDropDisabled(columnIndex: number, match: any[]): boolean {
//   if (columnIndex === 0) return true;
//   return match.every(team => team.name !== null);
// }
//
// private findColumnIndex(match: any[]): number {
//   return this.list.findIndex((column: any[]) => column.includes(match));
// }
