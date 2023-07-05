import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CategoryManagementComponent } from './category-management.component';

import { FormsModule } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { CategoryManagementRoutingModule } from './category-management-routing.module';

@NgModule({
  declarations: [CategoryManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    CategoryManagementRoutingModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    PaginatorModule,
    SharedModule,
  ],
  providers: [CategoryService, MessageService],
})
export class CategoryManagementModule {}
