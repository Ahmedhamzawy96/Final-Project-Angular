import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptforstoreComponent } from './receiptforstore.component';

describe('ReceiptforstoreComponent', () => {
  let component: ReceiptforstoreComponent;
  let fixture: ComponentFixture<ReceiptforstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptforstoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptforstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
