import { SelectionModel } from '@angular/cdk/collections';
import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BLOG } from 'src/app/constants/message.constant';
import { Blog, BlogRecord } from 'src/app/models/blog';
import { TableColumn } from 'src/app/models/table-column';
import { BlogService } from 'src/app/services/blog.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-blog-table',
  template: '',
})
export abstract class BlogTableComponent {
  abstract state: number;
  abstract canEdit: boolean;
  abstract canRestore: boolean;
  abstract canDelete: boolean;
  abstract activeName: string;
  abstract userId: number;

  blogs: Blog[] = [];
  colDefs: TableColumn[] = [];
  keywords: string = '';

  selection = new SelectionModel<Blog>(true, []);
  showSelectionCol: boolean = false;
  showMultipleBtn: boolean = false;

  isLoadingBlogs: boolean = false;
  isLoadingSearch: boolean = false;
  isLoadingRestore: boolean = false;
  isLoadingDelete: boolean = false;

  currentPage: number = 1;
  totalCount: number = 0;
  pageSize: number = 20;

  restoredIds: number[] = [];
  deletedIds: number[] = [];

  constructor(
    private router: Router,
    protected renderer: Renderer2,
    protected blogService: BlogService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.colDefs = this.getColDefs();
    this.getBlogs();
  }

  abstract getColDefs(): TableColumn[];

  getColumns(): string[] {
    return this.colDefs
      .filter((colDef: TableColumn) => !colDef.hidden)
      .map((colDef: TableColumn) => colDef.field);
  }

  searchClick() {
    this.isLoadingBlogs = true;
    this.selection.clear();
    this.showSelectionCol = false;
    this.colDefs = this.getColDefs();
    this.getBlogs();
  }

  getBlogs() {
    this.isLoadingBlogs = true;
    this.blogService
      .getBlogs(
        this.state,
        this.currentPage,
        this.pageSize,
        this.keywords,
        this.userId
      )
      .subscribe({
        next: (blogRecord: BlogRecord) => {
          this.isLoadingBlogs = false;
          this.blogs = blogRecord.blogs;
          this.totalCount = blogRecord.totalCount;
        },
        error: (error) => {
          console.log(error);
          this.isLoadingBlogs = false;
          this.messageService.openSnackBar('error', BLOG.GET_FAIL);
        },
      });
  }

  goToDetail(id: number) {
    this.router.navigate([`/detail/${id}`]);
  }

  onMultipleDelete() {
    this.selection.selected.forEach((article) =>
      this.deletedIds.push(article.id)
    );
    this.onDeleteToDustbin(this.selection.selected[0].state);
  }

  onEdit(blog: Blog) {
    this.router.navigate([`/edit/${blog.id}`], {
      queryParams: { from: this.activeName },
    });
  }

  onDelete(blog: Blog) {
    this.deletedIds.push(blog.id);
    this.onDeleteToDustbin(this.state);
  }

  onRestore(blog: Blog) {
    this.restoredIds.push(blog.id);
    this.onRestoreToPublish();
  }

  onMultipleRestore() {
    this.selection.selected.forEach((blog) => this.restoredIds.push(blog.id));
    this.onRestoreToPublish();
  }

  onRestoreToPublish() {
    const dialogRef = this.dialogService.openWarningDialog(
      'Information',
      BLOG.RESTORE_CONFIRM,
      'Ok',
      'Cancel'
    );
    const _destroy = new Subject<void>();
    dialogRef.componentInstance.confirmAction
      .pipe(takeUntil(_destroy))
      .subscribe({
        next: () => {
          this.isLoadingRestore = true;
          this.blogService.restoreBlogs(this.restoredIds).subscribe({
            next: () => {
              this.restoredIds.forEach((id) => {
                const index = this.blogs.findIndex((blog) => blog.id === id);
                if (index !== 1) {
                  this.blogs.splice(index, 1);
                }
              });
              this.blogs = [...this.blogs];
              this.blogService.setUpdatePublishedTab();
              this.blogService.setUpdateBlogs();
              this.isLoadingRestore = false;
              this.restoredIds = [];
              this.selection.clear();
              this.messageService.openSnackBar('success', BLOG.RESTORE_SUCCESS);
            },
            error: () => {
              this.isLoadingRestore = false;
              this.restoredIds = [];
              this.selection.clear();
              this.messageService.openSnackBar('error', BLOG.RESTORE_FAIL);
            },
          });
          this.showSelectionCol = false;
          this.colDefs = this.getColDefs();
        },
      });
    dialogRef.componentInstance.closeAction
      .pipe(takeUntil(_destroy))
      .subscribe(() =>
        this.messageService.openSnackBar('info', BLOG.RESTORE_CANCEL)
      );
    dialogRef.afterClosed().subscribe(() => {
      _destroy.next();
      _destroy.complete();
    });
  }

  onDeleteToDustbin(state: number) {
    const isDeletePermanent =
      this.activeName === 'blogs' || this.activeName === 'dustbin';
    const dialogRef = this.dialogService.openWarningDialog(
      'Confirmation',
      isDeletePermanent
        ? BLOG.DELETE_PERMANENT_CONFIRM
        : BLOG.DELETE_DUSTBIN_CONFIRM,
      'Ok',
      'Cancel'
    );
    const _destroy = new Subject<void>();
    dialogRef.componentInstance.confirmAction
      .pipe(takeUntil(_destroy))
      .subscribe(() => {
        this.isLoadingDelete = true;
        let blogs$;
        if (isDeletePermanent) {
          blogs$ = this.blogService.deleteBlogs(this.deletedIds);
        } else {
          blogs$ = this.blogService.deleteBlogsToDustbin(
            this.deletedIds,
            state
          );
        }
        blogs$.subscribe({
          next: () => {
            this.deletedIds.forEach((id) => {
              const index = this.blogs.findIndex((blog) => blog.id === id);
              if (index !== 1) {
                this.blogs.splice(index, 1);
              }
            });
            this.blogs = [...this.blogs];
            if (state !== 3) {
              this.blogService.setUpdatePublishedTab();
              this.blogService.setUpdateBlogs();
            }
            this.blogService.setUpdateDustbinTab();
            this.isLoadingDelete = false;
            this.deletedIds = [];
            this.selection.clear();
            this.messageService.openSnackBar('success', BLOG.DELETE_SUCCESS);
          },
          error: (error) => {
            this.isLoadingDelete = false;
            this.messageService.openSnackBar('error', BLOG.DELETE_FAIL);
            this.deletedIds = [];
            this.selection.clear();
          },
        });
        this.showSelectionCol = false;
        this.colDefs = this.getColDefs();
      });
    dialogRef.componentInstance.closeAction
      .pipe(takeUntil(_destroy))
      .subscribe(() => {
        this.messageService.openSnackBar('info', BLOG.DELETE_CANCEL),
          (this.deletedIds = []);
      });
    dialogRef.afterClosed().subscribe(() => {
      _destroy.next();
      _destroy.complete();
    });
  }

  isSelectedAll() {
    const numSelected = this.selection.selected.length;
    const numRows = this.blogs.length;
    return numSelected === numRows;
  }

  selectAllRows() {
    if (this.isSelectedAll()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.blogs);
  }

  openSelectionCol() {
    this.showSelectionCol = !this.showSelectionCol;
    this.selection.clear();
    this.colDefs = this.getColDefs();
  }
}
