import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DustbinTabComponent } from './dustbin-tab.component';

describe('DustbinTabComponent', () => {
  let component: DustbinTabComponent;
  let fixture: ComponentFixture<DustbinTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DustbinTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DustbinTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
