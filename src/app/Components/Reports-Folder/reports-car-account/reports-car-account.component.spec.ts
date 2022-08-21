import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsCARAccountComponent } from './reports-car-account.component';

describe('ReportsCARAccountComponent', () => {
  let component: ReportsCARAccountComponent;
  let fixture: ComponentFixture<ReportsCARAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsCARAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsCARAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
