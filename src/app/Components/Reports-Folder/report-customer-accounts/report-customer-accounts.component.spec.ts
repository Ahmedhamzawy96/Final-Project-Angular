import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerAccountsComponent } from './report-customer-accounts.component';

describe('ReportCustomerAccountsComponent', () => {
  let component: ReportCustomerAccountsComponent;
  let fixture: ComponentFixture<ReportCustomerAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCustomerAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCustomerAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
