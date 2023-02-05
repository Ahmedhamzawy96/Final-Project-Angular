import { TestBed } from '@angular/core/testing';

import { RecieptPrintService } from './reciept-print.service';

describe('RecieptPrintService', () => {
  let service: RecieptPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecieptPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
