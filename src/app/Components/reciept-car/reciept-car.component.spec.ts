import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieptCarComponent } from './reciept-car.component';

describe('RecieptCarComponent', () => {
  let component: RecieptCarComponent;
  let fixture: ComponentFixture<RecieptCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecieptCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecieptCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
