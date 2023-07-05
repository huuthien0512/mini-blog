import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss'],
})
export class EditCategoryDialogComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() okButtonLabel?: string;
  @Input() cancelButtonLabel?: string;
  @Input() inputValue!: string;

  @Output() confirmAction = new EventEmitter<string>();
  @Output() closeAction = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<EditCategoryDialogComponent>) {}

  okAction() {
    this.dialogRef.close();
    this.confirmAction.emit(this.inputValue);
  }

  cancelAction() {
    this.dialogRef.close();
    this.closeAction.emit();
  }
}
