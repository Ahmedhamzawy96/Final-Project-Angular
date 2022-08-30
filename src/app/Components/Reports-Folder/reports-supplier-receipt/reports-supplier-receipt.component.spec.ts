import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSupplierReceiptComponent } from './reports-supplier-receipt.component';

describe('ReportsSupplierReceiptComponent', () => {
  let component: ReportsSupplierReceiptComponent;
  let fixture: ComponentFixture<ReportsSupplierReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsSupplierReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsSupplierReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
