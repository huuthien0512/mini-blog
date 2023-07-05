import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLinkCellComponent } from './table-link-cell.component';

describe('TableLinkCellComponent', () => {
  let component: TableLinkCellComponent;
  let fixture: ComponentFixture<TableLinkCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLinkCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLinkCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
