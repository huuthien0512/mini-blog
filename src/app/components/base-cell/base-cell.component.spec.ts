import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCellComponent } from './base-cell.component';

describe('BaseCellComponent', () => {
  let component: BaseCellComponent;
  let fixture: ComponentFixture<BaseCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
