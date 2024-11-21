import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpService } from './shared/sign-up.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  public signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private readonly signUpService: SignUpService) {}

  public handleSubmit() {
    if (this.signUpForm.value.name && this.signUpForm.value.password) {
      this.signUpService
        .signUp({
          name: this.signUpForm.value.name,
          password: this.signUpForm.value.password,
        })
        .subscribe({
          next: (user) => {
            console.log(user);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
