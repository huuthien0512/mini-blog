import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';

import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { RoleService } from 'src/app/services/role.service';
import { AdminUserService } from 'src/app/services/admin/admin-user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserManagementRoutingModule,
    MatCardModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
  providers: [RoleService, AdminUserService, DialogService, MessageService],
})
export class UserManagementModule {}
