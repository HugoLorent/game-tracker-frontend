import { Injectable } from '@angular/core';
import {
  AccessToken,
  Authentication,
  User,
} from '../interfaces/authentication.interface';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  public signUp(signUp: Authentication): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, signUp);
  }

  public login(login: Authentication): Observable<AccessToken> {
    return this.http
      .post<AccessToken>(`${this.baseUrl}/auth/login`, login)
      .pipe(
        tap({
          next: (accessToken) => {
            localStorage.setItem('access_token', accessToken.access_token);
          },
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log('No token found');
      return false;
    }

    const tokenExpirationInMs =
      JSON.parse(atob(accessToken.split('.')[1])).exp * 1000;
    if (Date.now() > tokenExpirationInMs) {
      console.log('Token expired');
      return false;
    }
    return true;
  }
}
