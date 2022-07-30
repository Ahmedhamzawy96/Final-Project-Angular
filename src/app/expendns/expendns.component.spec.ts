import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpendnsComponent } from './expendns.component';

describe('ExpendnsComponent', () => {
  let component: ExpendnsComponent;
  let fixture: ComponentFixture<ExpendnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpendnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpendnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
