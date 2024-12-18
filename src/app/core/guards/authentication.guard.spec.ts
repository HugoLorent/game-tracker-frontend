import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { NotAuthenticateGuard } from './authentication.guard';

describe('authenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      NotAuthenticateGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
