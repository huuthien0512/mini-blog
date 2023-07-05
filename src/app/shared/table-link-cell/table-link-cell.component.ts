import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-link-cell',
  templateUrl: './table-link-cell.component.html',
  styleUrls: ['./table-link-cell.component.scss'],
})
export class TableLinkCellComponent {
  @Input() data!: any;

  id!: number;
  value!: string;
  actions: any;

  ngOnInit() {
    this.id = this.data.id;
    this.value = this.data.value;
    this.actions = this.data.actions;
  }

  onClick() {
    if (this.actions && this.actions.detail) {
      this.actions.detail(this.id);
    }
  }
}
