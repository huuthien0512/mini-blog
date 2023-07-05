import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { BlogTableComponent } from '../../blog-table/blog-table.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Blog, BlogRecord } from 'src/app/models/blog';
import { TableColumn } from 'src/app/models/table-column';
import { TableTextCellComponent } from 'src/app/shared/table-text-cell/table-text-cell.component';
import { TableLinkCellComponent } from 'src/app/shared/table-link-cell/table-link-cell.component';
import { TableDateCellComponent } from 'src/app/shared/table-date-cell/table-date-cell.component';
import { TableActionCellComponent } from 'src/app/shared/table-action-cell/table-action-cell.component';
import { TableSelectionCellComponent } from 'src/app/shared/table-selection-cell/table-selection-cell.component';
import { STATE } from 'src/app/constants/blog.constant';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';
import { BlogService } from 'src/app/services/blog.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-published-tab',
  templateUrl: './published-tab.component.html',
  styleUrls: ['./published-tab.component.scss'],
})
export class PublishedTabComponent extends BlogTableComponent {
  @ViewChild('tabHeader') tabHeader!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild('tabFooter') tabFooter!: ElementRef;

  state: number = STATE.PUBLISHED;
  canEdit: boolean = true;
  canRestore: boolean = false;
  canDelete: boolean = true;
  activeName: string = 'post';
  userId: number = -1;

  private _destroySubject: Subject<void> = new Subject();

  constructor(
    router: Router,
    renderer: Renderer2,
    blogService: BlogService,
    dialogService: DialogService,
    messageService: MessageService,
    private storageService: StorageService
  ) {
    super(router, renderer, blogService, dialogService, messageService);
  }

  override ngOnInit(): void {
    this.userId = this.storageService.getLoggedInUser().id;
    this.blogService.$updatePublishedTab
      .pipe(takeUntil(this._destroySubject))
      .subscribe(() => {
        this.getBlogs();
      });
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.onSetTableHeight();
  }

  getColDefs(): TableColumn[] {
    return [
      {
        name: '',
        field: 'selection',
        hidden: !this.showSelectionCol,
        cellComponent: TableSelectionCellComponent,
        params: {
          selection: this.selection,
        },
      },
      {
        name: 'No.',
        field: 'index',
        hidden: false,
        cellComponent: TableTextCellComponent,
      },
      {
        name: 'Title',
        field: 'title',
        hidden: false,
        cellComponent: TableLinkCellComponent,
        actions: {
          detail: (id: number) => this.goToDetail(id),
        },
      },
      {
        name: 'Latest Editing Time',
        field: 'editTime',
        hidden: false,
        cellComponent: TableDateCellComponent,
      },
      {
        name: 'Author',
        field: 'nickname',
        hidden: false,
        cellComponent: TableTextCellComponent,
      },
      {
        name: 'Category',
        field: 'categoryName',
        hidden: false,
        cellComponent: TableTextCellComponent,
      },
      {
        name: '',
        field: 'action',
        hidden: false,
        cellComponent: TableActionCellComponent,
        params: {
          canEdit: this.canEdit,
          canRestore: this.canRestore,
          canDelete: this.canDelete,
          showSelectionCol: this.showSelectionCol,
        },
        actions: {
          edit: (blog: Blog) => this.onEdit(blog),
          delete: (blog: Blog) => this.onDelete(blog),
        },
      },
    ];
  }

  onSetTableHeight() {
    const tabHeaderHeight = `${this.tabHeader.nativeElement.offsetHeight}px`;
    const tabFooterHeight = `${this.tabFooter.nativeElement.offsetHeight}px`;
    this.renderer.setStyle(
      this.tableContainer.nativeElement,
      'height',
      `calc(100% - ${tabHeaderHeight} - ${tabFooterHeight})`
    );
  }

  onPageSizeChange(currentPage: number) {
    this.currentPage = currentPage;
    this.getBlogs();
  }

  ngOnDestroy() {
    this._destroySubject.next();
    this._destroySubject.complete();
  }
}
