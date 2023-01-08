import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsCustomerTotalComponent } from './reports-customer-total.component';

describe('ReportsCustomerTotalComponent', () => {
  let component: ReportsCustomerTotalComponent;
  let fixture: ComponentFixture<ReportsCustomerTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsCustomerTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsCustomerTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
