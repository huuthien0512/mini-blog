import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-selection-cell',
  templateUrl: './table-selection-cell.component.html',
  styleUrls: ['./table-selection-cell.component.scss'],
})
export class TableSelectionCellComponent {
  @Input() data: any;

  selection!: any;
  value!: any;

  ngOnInit() {
    this.selection = this.data.params.selection;
    this.value = this.data.value;
  }
}
