import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Output() confirmAction = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<InfoDialogComponent>) {}

  okAction() {
    this.dialogRef.close();
    this.confirmAction.emit();
  }
}
