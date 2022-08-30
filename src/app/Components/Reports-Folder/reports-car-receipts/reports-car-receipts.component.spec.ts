import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsCARReceiptsComponent } from './reports-car-receipts.component';

describe('ReportsCARReceiptsComponent', () => {
  let component: ReportsCARReceiptsComponent;
  let fixture: ComponentFixture<ReportsCARReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsCARReceiptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsCARReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
