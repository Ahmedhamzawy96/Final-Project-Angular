import { TestBed } from '@angular/core/testing';

import { ExportProductService } from './export-product.service';

describe('ExportProductService', () => {
  let service: ExportProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
