import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToCarRefundComponent } from './to-car-refund.component';

describe('ToCarRefundComponent', () => {
  let component: ToCarRefundComponent;
  let fixture: ComponentFixture<ToCarRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToCarRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToCarRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
