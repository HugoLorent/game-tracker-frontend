import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const NotAuthenticateGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.user$.getValue()) {
    const tokenExpirationInMs =
      authenticationService.user$.getValue()!.exp * 1000;
    if (Date.now() > tokenExpirationInMs) {
      console.log('Token expired');
      authenticationService.logout();
      return false;
    }
    return true;
  }
  console.log('No token found');
  router.navigate(['/login']);
  return false;
};

export const AuthenticateGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.user$.getValue()) {
    console.log('Already logged in');
    router.navigate(['/']);
    return false;
  }

  return true;
};
