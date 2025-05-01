import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {CustomColumnDirective} from './custom-column.directive';
import {StarDirective} from '../../directives/star.directive';


@Component({
  selector: 'app-table',
  imports: [
    NgTemplateOutlet,
    NgForOf,
    NgIf
  ],
  templateUrl: './table.component.html',
  standalone: true,
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterContentInit {

  // Источник данных таблицы
  @Input() dataSource: any[] = [];

  // Собираем все определения колонок, заданные через content projection
  @ContentChildren(CustomColumnDirective) columnDefs!: QueryList<CustomColumnDirective>;


  // Массив колонок с шаблонами
  columns: any[] = [];

  ngAfterContentInit() {
    // Формируем массив колонок по полученным директивам

    this.columns = this.columnDefs.map(colDef => ({
      name: colDef.name,
      headerTemplate: colDef.headerCellDef.template,
      cellTemplate: colDef.cellDef.template,
      classStyle:colDef.classes
    }));
    setTimeout(() => {
      this.columnDefs.forEach(col => col.findMaxAndMark());
    });

  }

}
