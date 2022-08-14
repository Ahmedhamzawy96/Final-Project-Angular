import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreportComponent } from './carreport.component';

describe('CarreportComponent', () => {
  let component: CarreportComponent;
  let fixture: ComponentFixture<CarreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
