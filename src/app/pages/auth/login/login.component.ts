import { Component, inject, signal } from '@angular/core';
import { GridLayoutComponent } from "../../../components/layouts/grid-layout/grid-layout.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
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
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  imagePath = 'assets/images/loginImage.svg';
  hidePassword = true;
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private userDetailsService = inject(UserDetailsService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        const user = await this.authService.login(email, password);
        
        if (user) {
          this.userDetailsService.setUserDetails(user);
          this.toastService.showToast('Login Success', 'success');
          this.router.navigate(['/home/expense']);
        } else {
          this.toastService.showToast('Email or Password incorrect', 'danger');
        }
      } catch (error) {
        this.toastService.showToast('Login failed', 'danger');
      }
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToResetPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
