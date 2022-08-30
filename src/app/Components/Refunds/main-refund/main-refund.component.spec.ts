import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRefundComponent } from './main-refund.component';

describe('MainRefundComponent', () => {
  let component: MainRefundComponent;
  let fixture: ComponentFixture<MainRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
