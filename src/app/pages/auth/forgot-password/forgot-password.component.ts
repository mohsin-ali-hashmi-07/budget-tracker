import { Component } from '@angular/core';
import { GridLayoutComponent } from "../../../components/grid-layout/grid-layout.component";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  imports: [GridLayoutComponent,  MatButtonModule,
    ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  imagePath = 'assets/images/forgotPassImage.svg';
  resetForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router){
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      console.log('Form Submitted:', this.resetForm.value);
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
