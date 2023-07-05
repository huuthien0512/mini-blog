import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogService } from 'src/app/services/dialog.service';
import { LoginRoutingModule } from './login-routing.module';
import { ErrorMessagePipe } from 'src/app/pipes/error-message.pipe';

@NgModule({
  declarations: [LoginComponent, ErrorMessagePipe],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [DialogService],
  exports: [LoginRoutingModule],
})
export class LoginModule {}
