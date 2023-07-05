import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CATEGORY } from 'src/app/constants/message.constant';
import { Category } from 'src/app/models/category';
import { TableColumn } from 'src/app/models/table-column';
import { CategoryService } from 'src/app/services/category.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { TableActionCellComponent } from 'src/app/shared/table-action-cell/table-action-cell.component';
import { TableDateCellComponent } from 'src/app/shared/table-date-cell/table-date-cell.component';
import { TableSelectionCellComponent } from 'src/app/shared/table-selection-cell/table-selection-cell.component';
import { TableTextCellComponent } from 'src/app/shared/table-text-cell/table-text-cell.component';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent {
  @ViewChild('tabHeader') tabHeader!: ElementRef;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild('tabFooter') tabFooter!: ElementRef;

  canEdit: boolean = true;
  canDelete: boolean = true;

  cateName: string = '';
  selItems: number[] = [];
  categories: Category[] = [];
  loading: boolean = false;

  selection = new SelectionModel<Category>(true, []);
  showSelectionCol: boolean = false;

  showMultipleBtn: boolean = false;

  colDefs: TableColumn[] = [];

  isAdmin: boolean = false;

  currentPage: number = 1;
  pageSize: number = 7;
  keywords: string = '';

  constructor(
    private renderer: Renderer2,
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.isAdmin = this.storageService.getLoggedInUser().roleName === 'ADMIN';
    this.colDefs = this.getColDefs();
    this.getCategories();
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
        name: 'Name',
        field: 'name',
        hidden: false,
        cellComponent: TableTextCellComponent,
      },
      {
        name: 'Last Editing Time',
        field: 'editTime',
        hidden: false,
        cellComponent: TableDateCellComponent,
      },
      {
        name: '',
        field: 'action',
        hidden: !this.isAdmin,
        cellComponent: TableActionCellComponent,
        params: {
          canEdit: this.canEdit,
          canDelete: this.canDelete,
          showSelectionCol: this.showSelectionCol,
        },
        actions: {
          edit: (category: Category) => this.onEdit(category),
          delete: (category: Category) => this.onDelete(category),
        },
      },
    ];
  }

  getCategories() {
    this.loading = true;
    this.categoryService.getCategories(this.keywords).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.openSnackBar('error', CATEGORY.GET_FAIL);
        this.loading = false;
      },
    });
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

  onMultipleDelete() {
    const dialogRef = this.dialogService.openWarningDialog(
      'Confirmation',
      `Delete ${this.selection.selected.length} categories ?`,
      'Ok',
      'Cancel'
    );
    const _destroy = new Subject<void>();
    dialogRef.componentInstance.confirmAction
      .pipe(takeUntil(_destroy))
      .subscribe(() => {
        let ids: number[] = [];
        this.selection.selected.forEach((category) => {
          ids.push(category.id);
        });
        this.deleteCategory(ids);
        this.showSelectionCol = false;
        this.colDefs = this.getColDefs();
      });
    dialogRef.componentInstance.closeAction
      .pipe(takeUntil(_destroy))
      .subscribe(() =>
        this.messageService.openSnackBar('info', CATEGORY.DELETE_CANCEL)
      );
    dialogRef.afterClosed().subscribe(() => {
      _destroy.next();
      _destroy.complete();
    });
  }

  onEdit(category: Category) {
    const dialogRef = this.dialogService.openEditCategoryDialog(
      'Edit Category',
      'Please enter a new name',
      'Ok',
      'Cancel',
      category.name
    );
    const _destroy = new Subject<void>();
    dialogRef.componentInstance.confirmAction
      .pipe(takeUntil(_destroy))
      .subscribe((categoryName: string) => {
        const newCategoryName = categoryName.trim();
        if (newCategoryName) {
          this.loading = true;
          const editedCategory: Category = {
            id: category.id,
            createTime: category.createTime,
            editTime: category.editTime,
            name: newCategoryName,
          };
          this.categoryService.updateCategory(editedCategory).subscribe({
            next: (updatedCategory: Category) => {
              this.messageService.openSnackBar(
                'success',
                CATEGORY.EDIT_SUCCESS
              );
              const index = this.categories.findIndex(
                (category) => category.id === updatedCategory.id
              );
              if (index !== -1) {
                this.categories.splice(index, 1, updatedCategory);
              }
              this.categories = [...this.categories];
            },
            error: (error) => {
              this.messageService.openSnackBar('error', CATEGORY.EDIT_FAIL);
              this.loading = false;
            },
          });
        } else {
          this.messageService.openSnackBar('info', 'Data cannot be empty!');
        }
      });
    dialogRef.componentInstance.closeAction
      .pipe(takeUntil(_destroy))
      .subscribe(() =>
        this.messageService.openSnackBar('info', 'Edit canceled')
      );
    dialogRef.afterClosed().subscribe(() => {
      _destroy.next();
      _destroy.complete();
    });
  }

  onDelete(category: Category) {
    const dialogRef = this.dialogService.openWarningDialog(
      'Confirmation',
      `Delete category: ${category.name} ?`,
      'Ok',
      'Cancel'
    );
    const _destroy = new Subject<void>();
    dialogRef.componentInstance.confirmAction
      .pipe(takeUntil(_destroy))
      .subscribe(() => {
        this.deleteCategory([category.id]);
      });
    dialogRef.componentInstance.closeAction
      .pipe(takeUntil(_destroy))
      .subscribe(() =>
        this.messageService.openSnackBar('info', 'Delete canceled')
      );
    dialogRef.afterClosed().subscribe(() => {
      _destroy.next();
      _destroy.complete();
    });
  }

  deleteCategory(ids: number[]) {
    this.loading = true;
    this.categoryService.deleteCategories(ids).subscribe({
      next: () => {
        ids.forEach((id) => {
          const index = this.categories.findIndex(
            (category) => category.id === id
          );
          if (index !== -1) {
            this.categories.splice(index, 1);
          }
        });
        this.categories = [...this.categories];
        this.loading = false;
        this.selection.clear();
        this.messageService.openSnackBar('success', 'Deleted successfully');
      },
      error: (error) => {
        this.selection.clear();
        this.loading = false;
        if (error.status === 403) {
          this.messageService.openSnackBar('error', CATEGORY.DELETE_FAIL);
        } else if (error.status === 500) {
          this.messageService.openSnackBar('error', CATEGORY.DELETE_FAIL_USED);
        }
      },
    });
  }

  getColumns(): string[] {
    return this.colDefs
      .filter((colDef: TableColumn) => !colDef.hidden)
      .map((colDef: TableColumn) => colDef.field);
  }

  isSelectedAll() {
    const numSelected = this.selection.selected.length;
    const numRows = this.categories.length;
    return numSelected === numRows;
  }

  selectAllRows() {
    if (this.isSelectedAll()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.categories);
  }

  openSelectionCol() {
    this.showSelectionCol = !this.showSelectionCol;
    this.selection.clear();
    this.colDefs = this.getColDefs();
  }

  searchClick() {
    this.getCategories();
  }

  onAddCategory() {
    const dialogRef = this.dialogService.openEditCategoryDialog(
      'Create Category',
      'Please enter name',
      'Ok',
      'Cancel'
    );
    const _destroy = new Subject<void>();
    dialogRef.componentInstance.confirmAction
      .pipe(takeUntil(_destroy))
      .subscribe((categoryName: string) => {
        const newCategoryName = categoryName.trim();
        if (newCategoryName) {
          this.loading = true;
          this.categoryService.addCategory(newCategoryName).subscribe({
            next: (addedCategory: Category) => {
              this.categories.push(addedCategory);
              this.categories = [...this.categories];
              this.loading = false;
              this.messageService.openSnackBar(
                'success',
                'Added successfully!'
              );
            },
            error: (error) => {
              this.messageService.openSnackBar('error', 'Add failed!');
              this.loading = false;
            },
          });
        } else {
          this.messageService.openSnackBar('info', 'Data cannot be empty!');
        }
      });
    dialogRef.componentInstance.closeAction
      .pipe(takeUntil(_destroy))
      .subscribe(() =>
        this.messageService.openSnackBar('info', 'Create canceled')
      );
    dialogRef.afterClosed().subscribe(() => {
      _destroy.next();
      _destroy.complete();
    });
  }
}
