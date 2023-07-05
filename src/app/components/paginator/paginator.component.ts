import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() pageSize!: number;
  @Input() totalCount!: number;

  @Output() pageSizeChange = new EventEmitter<number>();

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageSizeChange.emit(e.pageIndex + 1);
  }
}
