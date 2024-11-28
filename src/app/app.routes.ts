import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {
  NotAuthenticateGuard,
  AuthenticateGuard,
} from './core/guards/authentication.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [NotAuthenticateGuard] },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticateGuard],
  },
];
