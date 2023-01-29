import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSellReceiptReportComponent } from './car-sell-receipt-report.component';

describe('CarSellReceiptReportComponent', () => {
  let component: CarSellReceiptReportComponent;
  let fixture: ComponentFixture<CarSellReceiptReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSellReceiptReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSellReceiptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
