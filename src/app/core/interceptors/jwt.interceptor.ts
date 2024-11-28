import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url === 'http://localhost:3000/auth/login' ||
    req.url === 'http://localhost:3000/users'
  ) {
    return next(req);
  }
  const authenticationService = inject(AuthenticationService);
  if (authenticationService.user$.getValue()) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  }
  return next(req);
};
