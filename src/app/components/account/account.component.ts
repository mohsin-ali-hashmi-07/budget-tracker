import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [ CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  accountForm: FormGroup;
  @Input() userData!: any

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      phone_number: [''],
      budget_limit: [''],
      job_title: [''],
      street_address: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      dob: [''],
      education: [''],
      gender: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'] && this.userData) {
      this.accountForm.patchValue(this.userData);
    }
  }

  onSubmit(){
    console.log("this.", this.accountForm.value)
  }
}
