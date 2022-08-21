import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCarRefundComponent } from './from-car-refund.component';

describe('FromCarRefundComponent', () => {
  let component: FromCarRefundComponent;
  let fixture: ComponentFixture<FromCarRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromCarRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromCarRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
