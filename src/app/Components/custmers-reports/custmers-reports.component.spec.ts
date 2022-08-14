import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmersReportsComponent } from './custmers-reports.component';

describe('CustmersReportsComponent', () => {
  let component: CustmersReportsComponent;
  let fixture: ComponentFixture<CustmersReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustmersReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustmersReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
