import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSupplierAccountComponent } from './reports-supplier-account.component';

describe('ReportsSupplierAccountComponent', () => {
  let component: ReportsSupplierAccountComponent;
  let fixture: ComponentFixture<ReportsSupplierAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsSupplierAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsSupplierAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
