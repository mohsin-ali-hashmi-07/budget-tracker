import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, Location } from '@angular/common';
import { ProfileComponent } from "../../components/profile/profile.component";
import { AccountComponent } from "../../components/account/account.component";
import { UserDetailsService } from '../../services/user-details.service';
import { User, UserService } from '../../services/user.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-profile',
  imports: [NavbarComponent,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
     ProfileComponent, 
     MatProgressSpinnerModule,
    AccountComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  private location = inject(Location);
  selectedTabIndex = 0;
  userDetails = inject(UserDetailsService);
  userService = inject(UserService);
  
  // Store the fetched user data
  userData: User | null = null;
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.isLoading = true;
    this.error = null;
    
    const currentUser = this.userDetails.getCurrentUser();
    this.userService.getUserById(currentUser.id).subscribe({
      next: (user: any) => {
        this.userData = user[0];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.error = 'Failed to load user data';
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
