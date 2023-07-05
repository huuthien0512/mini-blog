import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DustbinTabComponent } from './dustbin-tab.component';
import { PaginatorModule } from '../../paginator/paginator.module';

@NgModule({
  declarations: [DustbinTabComponent],
  imports: [CommonModule, SharedModule, PaginatorModule],
  exports: [DustbinTabComponent],
})
export class DustbinTabModule {}
