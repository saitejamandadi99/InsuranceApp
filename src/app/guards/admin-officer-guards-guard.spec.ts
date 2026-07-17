import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminOfficerGuardsGuard } from './admin-officer-guards-guard';

describe('adminOfficerGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminOfficerGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
