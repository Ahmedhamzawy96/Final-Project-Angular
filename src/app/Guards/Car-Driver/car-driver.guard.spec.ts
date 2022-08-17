import { TestBed } from '@angular/core/testing';

import { CarDriverGuard } from './car-driver.guard';

describe('CarDriverGuard', () => {
  let guard: CarDriverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CarDriverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
