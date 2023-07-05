import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDateCellComponent } from './table-date-cell.component';

describe('TableDateCellComponent', () => {
  let component: TableDateCellComponent;
  let fixture: ComponentFixture<TableDateCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDateCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDateCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
