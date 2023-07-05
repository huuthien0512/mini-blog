import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { EditCategoryDialogComponent } from './edit-category-dialog/edit-category-dialog.component';
import { TableTextCellComponent } from './table-text-cell/table-text-cell.component';
import { CellLoaderComponent } from '../components/cell-loader/cell-loader.component';
import { BaseCellComponent } from '../components/base-cell/base-cell.component';
import { TableLinkCellComponent } from './table-link-cell/table-link-cell.component';
import { TableDateCellComponent } from './table-date-cell/table-date-cell.component';
import { TableActionCellComponent } from './table-action-cell/table-action-cell.component';
import { TableSelectionCellComponent } from './table-selection-cell/table-selection-cell.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

const COMPONENTS = [
  WarningDialogComponent,
  InfoDialogComponent,
  EditCategoryDialogComponent,
  TableTextCellComponent,
  CellLoaderComponent,
  BaseCellComponent,
  TableLinkCellComponent,
  TableDateCellComponent,
  TableActionCellComponent,
  TableSelectionCellComponent,
];

const MODULES = [
  FormsModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatMenuModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...MODULES],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {}
