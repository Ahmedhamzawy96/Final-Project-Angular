import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTotalStoreComponent } from './report-total-store.component';

describe('ReportTotalStoreComponent', () => {
  let component: ReportTotalStoreComponent;
  let fixture: ComponentFixture<ReportTotalStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTotalStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTotalStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
