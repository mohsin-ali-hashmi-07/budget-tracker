import { Component, inject } from '@angular/core';
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
  
  user: User = {
    id: 2,
    first_name: "Mohsin",
    last_name: "Ali",
    email: "mohsin@email.com",
    phone_number: 3075258159,
    budget_limit: 100000,
    role: "user",
    job_title: "Coder",
    street_address: "78",
    city: "Islamabad",
    state: "Pakistan",
    zip_code: 12345,
    complete_address: "",
    dob: 31557600000,
    education: "PHD",
    gender: "Male",
    expenses: [
      {
        id: 3,
        expense: "third expense",
        price: 15000,
        date: "22 Jan 2022",
        total_Expenditure: "90%"
      },
      {
        id: 4,
        expense: "fourth expense",
        price: 5000,
        date: "22 Jan 2022",
        total_Expenditure: "20%"
      }
    ]
  };
  aboutMeText: string = "Passionate software developer with years of experience in coding, debugging, and problem-solving. Loves to build scalable applications and optimize performance.";

}
