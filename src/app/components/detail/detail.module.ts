import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DetailRoutingModule } from './detail-routing.module';
import { MessageService } from 'src/app/services/message.service';
import { BlogService } from 'src/app/services/blog.service';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  providers: [BlogService, MessageService],
})
export class DetailModule {}
