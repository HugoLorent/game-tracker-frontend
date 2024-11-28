import { Injectable } from '@angular/core';
import {
  AccessToken,
  Authentication,
  User,
  UserPayload,
} from '../../interfaces/authentication.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public user$ = new BehaviorSubject<UserPayload | undefined>(
    this.getUserPayload()
  );
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
            this.user$.next(
              this.getUserPayloadFromToken(accessToken.access_token)
            );
          },
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.user$.next(undefined);
    this.router.navigate(['/login']);
  }

  private getUserPayload(): UserPayload | undefined {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      return this.getUserPayloadFromToken(accessToken);
    }
    return undefined;
  }

  private getUserPayloadFromToken(accessToken: string): UserPayload {
    const payload = atob(accessToken.split('.')[1]);
    return JSON.parse(payload);
  }
}
