import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportRecRefundComponent } from './export-rec-refund.component';

describe('ExportRecRefundComponent', () => {
  let component: ExportRecRefundComponent;
  let fixture: ComponentFixture<ExportRecRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportRecRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportRecRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
