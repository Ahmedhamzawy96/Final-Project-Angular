import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTotalComponent } from './reports-total.component';

describe('ReportsTotalComponent', () => {
  let component: ReportsTotalComponent;
  let fixture: ComponentFixture<ReportsTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
