import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { officerGuardsGuard } from './officer-guards-guard';

describe('officerGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => officerGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
