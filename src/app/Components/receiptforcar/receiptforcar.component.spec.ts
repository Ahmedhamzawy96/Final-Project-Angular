import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptforcarComponent } from './receiptforcar.component';

describe('ReceiptforcarComponent', () => {
  let component: ReceiptforcarComponent;
  let fixture: ComponentFixture<ReceiptforcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptforcarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptforcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
