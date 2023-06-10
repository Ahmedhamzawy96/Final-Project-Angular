import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationsComponent } from './registerations.component';

describe('RegisterationsComponent', () => {
  let component: RegisterationsComponent;
  let fixture: ComponentFixture<RegisterationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
