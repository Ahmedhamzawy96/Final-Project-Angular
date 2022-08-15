import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreportsComponent } from './spreports.component';

describe('SpreportsComponent', () => {
  let component: SpreportsComponent;
  let fixture: ComponentFixture<SpreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});