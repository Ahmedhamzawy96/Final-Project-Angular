import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitMarginCarComponent } from './profit-margin-car.component';

describe('ProfitMarginCarComponent', () => {
  let component: ProfitMarginCarComponent;
  let fixture: ComponentFixture<ProfitMarginCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitMarginCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitMarginCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
