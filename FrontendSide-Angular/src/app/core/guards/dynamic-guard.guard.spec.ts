import { TestBed } from '@angular/core/testing';

import { DynamicGuardGuard } from './dynamic-guard.guard';

describe('DynamicGuardGuard', () => {
  let guard: DynamicGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DynamicGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
