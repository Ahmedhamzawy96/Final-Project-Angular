import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptfromcarComponent } from './receiptfromcar.component';

describe('ReceiptfromcarComponent', () => {
  let component: ReceiptfromcarComponent;
  let fixture: ComponentFixture<ReceiptfromcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptfromcarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptfromcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
