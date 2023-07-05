import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-date-cell',
  templateUrl: './table-date-cell.component.html',
  styleUrls: ['./table-date-cell.component.scss'],
})
export class TableDateCellComponent {
  @Input() data!: any;
}
