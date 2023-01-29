import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReportComponent } from './store-report.component';

describe('StoreReportComponent', () => {
  let component: StoreReportComponent;
  let fixture: ComponentFixture<StoreReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
