import { TestBed } from '@angular/core/testing';

import { ClaimStatusServices } from './claim-status-services';

describe('ClaimStatusServices', () => {
  let service: ClaimStatusServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimStatusServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
