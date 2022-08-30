import { TestBed } from '@angular/core/testing';

import { ImportReceiptService } from './import-receipt.service';

describe('ImportReceiptService', () => {
  let service: ImportReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
