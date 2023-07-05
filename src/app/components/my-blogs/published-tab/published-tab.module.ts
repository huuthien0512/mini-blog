import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PublishedTabComponent } from './published-tab.component';
import { PaginatorModule } from '../../paginator/paginator.module';
import { BlogService } from 'src/app/services/blog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';

@NgModule({
  declarations: [PublishedTabComponent],
  imports: [CommonModule, SharedModule, PaginatorModule],
  providers: [BlogService, MessageService],
  exports: [PublishedTabComponent],
})
export class PublishedTabModule {}
