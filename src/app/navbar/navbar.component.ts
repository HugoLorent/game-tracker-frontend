import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { UserPayload } from '../core/interfaces/authentication.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  public user$: Observable<UserPayload | undefined>;

  constructor(private readonly authenticationService: AuthenticationService) {
    this.user$ = this.authenticationService.user$;
  }

  public signOut(): void {
    this.authenticationService.logout();
  }
}
