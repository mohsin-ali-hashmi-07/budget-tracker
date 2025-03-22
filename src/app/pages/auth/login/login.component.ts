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
import { ToastService } from '../../../services/toast.service';
import { UserDetailsService } from '../../../services/user-details.service';

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
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private userDetailsService = inject(UserDetailsService);

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
            this.userDetailsService.setUserDetails(users[0]);
            this.toastService.showToast('Login Success', 'success');
            this.router.navigate(['/home/expense']);
          } else {
            this.toastService.showToast('Email or Password incorrect', 'danger');
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
