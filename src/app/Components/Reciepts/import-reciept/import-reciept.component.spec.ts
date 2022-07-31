import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRecieptComponent } from './import-reciept.component';

describe('ImportRecieptComponent', () => {
  let component: ImportRecieptComponent;
  let fixture: ComponentFixture<ImportRecieptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportRecieptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
