import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BlogsComponent } from './blogs.component';

import { FormsModule } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { BlogsRoutingModule } from './blogs-routing.module';

@NgModule({
  declarations: [BlogsComponent],
  imports: [
    CommonModule,
    FormsModule,
    BlogsRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    SharedModule,
    PaginatorModule,
  ],
  providers: [BlogService, MessageService],
})
export class BlogsModule {}
