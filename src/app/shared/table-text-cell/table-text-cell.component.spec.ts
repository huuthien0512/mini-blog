import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTextCellComponent } from './table-text-cell.component';

describe('TableTextCellComponent', () => {
  let component: TableTextCellComponent;
  let fixture: ComponentFixture<TableTextCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTextCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTextCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
