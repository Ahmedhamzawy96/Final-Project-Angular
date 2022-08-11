import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportRecieptPrintComponent } from './export-reciept-print.component';

describe('ExportRecieptPrintComponent', () => {
  let component: ExportRecieptPrintComponent;
  let fixture: ComponentFixture<ExportRecieptPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportRecieptPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportRecieptPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
