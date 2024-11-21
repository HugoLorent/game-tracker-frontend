import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from './sign-up.model';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private readonly http: HttpClient) {}

  public signUp(signUp: SignUp): Observable<User> {
    return this.http.post<User>(this.baseUrl, signUp);
  }
}
