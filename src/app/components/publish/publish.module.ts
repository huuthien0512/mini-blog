import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PublishComponent } from './publish.component';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PublishRoutingModule } from './publish-routing.module';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { MessageService } from 'src/app/services/message.service';

@NgModule({
  declarations: [PublishComponent],
  imports: [
    CommonModule,
    FormsModule,
    PublishRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    AngularEditorModule,
  ],
  providers: [BlogService, CategoryService, MessageService],
})
export class PublishModule {}
