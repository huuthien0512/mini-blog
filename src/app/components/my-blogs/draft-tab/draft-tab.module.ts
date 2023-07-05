import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DraftTabComponent } from './draft-tab.component';
import { PaginatorModule } from '../../paginator/paginator.module';

@NgModule({
  declarations: [DraftTabComponent],
  imports: [CommonModule, SharedModule, PaginatorModule],
  exports: [DraftTabComponent],
})
export class DraftTabModule {}
