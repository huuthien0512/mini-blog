import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyBlogsComponent } from './my-blogs.component';

import { MatTabsModule } from '@angular/material/tabs';
import { DraftTabModule } from './draft-tab/draft-tab.module';
import { DustbinTabModule } from './dustbin-tab/dustbin-tab.module';
import { MyBlogsRoutingModule } from './my-blogs-routing.module';
import { PublishedTabModule } from './published-tab/published-tab.module';

@NgModule({
  declarations: [MyBlogsComponent],
  imports: [
    CommonModule,
    MyBlogsRoutingModule,
    MatTabsModule,
    PublishedTabModule,
    DraftTabModule,
    DustbinTabModule,
  ],
})
export class MyBlogsModule {}
