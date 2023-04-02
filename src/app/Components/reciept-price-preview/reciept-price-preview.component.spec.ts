import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieptPricePreviewComponent } from './reciept-price-preview.component';

describe('RecieptPricePreviewComponent', () => {
  let component: RecieptPricePreviewComponent;
  let fixture: ComponentFixture<RecieptPricePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecieptPricePreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecieptPricePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
