import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss'],
})
export class WarningDialogComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() okButtonLabel?: string;
  @Input() cancelButtonLabel?: string;
  @Output() confirmAction = new EventEmitter();
  @Output() closeAction = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<WarningDialogComponent>) {}

  okAction() {
    this.dialogRef.close();
    this.confirmAction.emit();
  }

  cancelAction() {
    this.dialogRef.close();
    this.closeAction.emit();
  }
}
