import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, Location } from '@angular/common';
import { ProfileComponent } from "../../components/profile/profile.component";
import { AccountComponent } from "../../components/account/account.component";

@Component({
  selector: 'app-user-profile',
  imports: [NavbarComponent,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
     ProfileComponent, 
    AccountComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  private location = inject(Location)
  selectedTabIndex = 0;

  goBack() {
    this.location.back()
  }
}
