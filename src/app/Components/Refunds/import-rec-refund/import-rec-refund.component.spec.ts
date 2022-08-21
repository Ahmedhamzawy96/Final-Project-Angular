import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRecRefundComponent } from './import-rec-refund.component';

describe('ImportRecRefundComponent', () => {
  let component: ImportRecRefundComponent;
  let fixture: ComponentFixture<ImportRecRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportRecRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportRecRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
