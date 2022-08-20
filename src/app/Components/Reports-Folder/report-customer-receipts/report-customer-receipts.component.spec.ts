import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerReceiptsComponent } from './report-customer-receipts.component';

describe('ReportCustomerReceiptsComponent', () => {
  let component: ReportCustomerReceiptsComponent;
  let fixture: ComponentFixture<ReportCustomerReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCustomerReceiptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCustomerReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
