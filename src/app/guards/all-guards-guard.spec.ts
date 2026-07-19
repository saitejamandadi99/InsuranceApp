import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allGuardsGuard } from './all-guards-guard';

describe('allGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => allGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
