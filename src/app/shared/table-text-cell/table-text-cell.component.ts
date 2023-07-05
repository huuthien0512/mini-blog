import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-text-cell',
  templateUrl: './table-text-cell.component.html',
  styleUrls: ['./table-text-cell.component.scss'],
})
export class TableTextCellComponent {
  @Input() data!: any;

  value!: string;
  ngOnInit() {
    this.value = this.data.value;
  }
}
