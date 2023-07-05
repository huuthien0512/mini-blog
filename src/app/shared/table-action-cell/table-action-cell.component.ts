import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-action-cell',
  templateUrl: './table-action-cell.component.html',
  styleUrls: ['./table-action-cell.component.scss'],
})
export class TableActionCellComponent {
  @Input() data!: any;

  id!: number;
  value!: any;
  canEdit: boolean = false;
  canRestore: boolean = false;
  canDelete: boolean = false;
  showSelectionCol: boolean = false;
  actions: any;

  ngOnInit() {
    this.id = this.data.id;
    this.value = this.data.value;
    this.canEdit = this.data.params.canEdit;
    this.canRestore = this.data.params.canRestore;
    this.canDelete = this.data.params.canDelete;
    this.showSelectionCol = this.data.params.showSelectionCol;
    this.actions = this.data.actions;
  }

  editBtnClick() {
    this.actions?.edit(this.value);
  }

  restoreBtnClick() {
    this.actions?.restore(this.value);
  }

  deleteBtnClick() {
    this.actions?.delete(this.value);
  }
}
