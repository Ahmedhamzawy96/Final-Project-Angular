import { TestBed } from '@angular/core/testing';

import { ExportRecieptService } from './export-reciept.service';

describe('ExportRecieptService', () => {
  let service: ExportRecieptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportRecieptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
