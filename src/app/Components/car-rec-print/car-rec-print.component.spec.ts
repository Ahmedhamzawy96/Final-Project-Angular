import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRecPrintComponent } from './car-rec-print.component';

describe('CarRecPrintComponent', () => {
  let component: CarRecPrintComponent;
  let fixture: ComponentFixture<CarRecPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRecPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarRecPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
