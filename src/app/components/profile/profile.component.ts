import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number?: number | null;
  budget_limit?: number | null;
  password?: string;
  role?: string;
  job_title?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: number;
  complete_address?: string;
  dob?: number;
  education?: string;
  gender?: string;
  expenses?: any;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  @Input() userData!: any

  aboutMeText: string = "Passionate software developer with years of experience in coding, debugging, and problem-solving. Loves to build scalable applications and optimize performance.";

}
