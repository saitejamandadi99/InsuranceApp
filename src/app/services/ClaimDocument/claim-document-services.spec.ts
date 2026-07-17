import { TestBed } from '@angular/core/testing';

import { ClaimDocumentServices } from './claim-document-services';

describe('ClaimDocumentServices', () => {
  let service: ClaimDocumentServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimDocumentServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
