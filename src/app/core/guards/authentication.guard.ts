import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const AuthenticationGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);

  if (!authenticationService.isAuthenticated()) {
    authenticationService.logout();
    return false;
  }
  return true;
};
