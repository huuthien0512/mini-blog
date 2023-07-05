import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../shared/warning-dialog/warning-dialog.component';
import { EditCategoryDialogComponent } from '../shared/edit-category-dialog/edit-category-dialog.component';
import { InfoDialogComponent } from '../shared/info-dialog/info-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openWarningDialog(
    title: string,
    content: string,
    okButtonLabel: string,
    cancelButtonLabel: string
  ) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '42rem',
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
    dialogRef.componentInstance.okButtonLabel = okButtonLabel;
    dialogRef.componentInstance.cancelButtonLabel = cancelButtonLabel;
    return dialogRef;
  }

  openInfoDialog(title: string, content: string) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '42rem',
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
    return dialogRef;
  }

  openEditCategoryDialog(
    title: string,
    content: string,
    okButtonLabel: string,
    cancelButtonLabel: string,
    inputValue: string = ''
  ) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '42rem',
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
    dialogRef.componentInstance.okButtonLabel = okButtonLabel;
    dialogRef.componentInstance.cancelButtonLabel = cancelButtonLabel;
    dialogRef.componentInstance.inputValue = inputValue;
    return dialogRef;
  }
}
