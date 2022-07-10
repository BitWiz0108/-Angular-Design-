import { TestBed } from '@angular/core/testing';

import { CodeTypeDataService } from './code-type-data.service';

describe('CodeTypeDataService', () => {
  let service: CodeTypeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeTypeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
