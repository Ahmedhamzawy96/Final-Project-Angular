import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitMarginStoreComponent } from './profit-margin-store.component';

describe('ProfitMarginStoreComponent', () => {
  let component: ProfitMarginStoreComponent;
  let fixture: ComponentFixture<ProfitMarginStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitMarginStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitMarginStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
