import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSupplierTotalComponent } from './reports-supplier-total.component';

describe('ReportsSupplierTotalComponent', () => {
  let component: ReportsSupplierTotalComponent;
  let fixture: ComponentFixture<ReportsSupplierTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsSupplierTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsSupplierTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
