import { TestBed } from '@angular/core/testing';

import { CarProductService } from './car-product.service';

describe('CarProductService', () => {
  let service: CarProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
