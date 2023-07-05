import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

type TypeMessage = 'error' | 'success' | 'info';
const className: Record<TypeMessage, string> = {
  success: 'success-snackbar',
  error: 'error-snackbar',
  info: 'info-snackbar',
};

@Injectable()
export class MessageService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  duration: number = 3000; // milisecond

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(type: TypeMessage, message: string) {
    this.snackBar.open(message, undefined, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration,
      panelClass: [className[type]],
    });
  }
}
