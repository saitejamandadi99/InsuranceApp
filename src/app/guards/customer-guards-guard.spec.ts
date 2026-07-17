import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { customerGuardsGuard } from './customer-guards-guard';

describe('customerGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => customerGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
