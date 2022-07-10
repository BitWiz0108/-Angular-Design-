import { TestBed } from '@angular/core/testing';

import { UploadPresentationService } from './uploadpresentation.service';

describe('UploadPresentationService', () => {
  let service: UploadPresentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
