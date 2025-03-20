import { Component, computed, inject, signal } from '@angular/core';
import { GridLayoutComponent } from "../../../components/layouts/grid-layout/grid-layout.component";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';

interface SignupForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  budgetLimit: FormControl<number | null>;
}

@Component({
  selector: 'app-signup',
  imports: [GridLayoutComponent, MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  imagePath = 'assets/images/signupImage.svg';

  hidePassword = signal(true);

  private fb = inject(FormBuilder);
  private router = inject(Router);

  signupForm: FormGroup<SignupForm>;

  constructor() {
    this.signupForm = this.fb.group<SignupForm>({
      firstName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      confirmPassword: this.fb.control('', [Validators.required]),
      budgetLimit: this.fb.control(0, [Validators.required, Validators.min(1)])
    }, { validators: this.passwordMatchValidator });
  }

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword()); // Update signal value
  }

  passwordVisibilityIcon = computed(() => this.hidePassword() ? 'visibility_off' : 'visibility');

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup; // Cast to FormGroup
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { mismatch: true };
  };
  onSubmit() {
    console.log("this.signupForm.value", this.signupForm.value)
    if (this.signupForm.valid) {
      console.log('Form Submitted:', this.signupForm.value);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
