import { TestBed } from '@angular/core/testing';

import { PolicyServices } from './policy-services';

describe('PolicyServices', () => {
  let service: PolicyServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
