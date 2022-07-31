import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsAccountsComponent } from './cars-accounts.component';

describe('CarsAccountsComponent', () => {
  let component: CarsAccountsComponent;
  let fixture: ComponentFixture<CarsAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
