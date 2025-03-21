import { Component, inject } from '@angular/core';
import { GridLayoutComponent } from "../../../components/layouts/grid-layout/grid-layout.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [GridLayoutComponent, MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  imagePath = 'assets/images/loginImage.svg';
  hidePassword = true;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.userService.login(email, password)
        .pipe()
        .subscribe((users) => {
          if (users && users.length > 0) {
            const user = users[0]; 
            localStorage.setItem('role', 'user'); 
            this.router.navigate(['/home/expense']);
          } else {
            alert('Invalid email or password. Please try again.');
          }
        });
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToResetPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
