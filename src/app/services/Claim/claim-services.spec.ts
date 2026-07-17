import { TestBed } from '@angular/core/testing';

import { ClaimServices } from './claim-services';

describe('ClaimServices', () => {
  let service: ClaimServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
