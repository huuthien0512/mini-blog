import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSelectionCellComponent } from './table-selection-cell.component';

describe('TableSelectionCellComponent', () => {
  let component: TableSelectionCellComponent;
  let fixture: ComponentFixture<TableSelectionCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSelectionCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSelectionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
