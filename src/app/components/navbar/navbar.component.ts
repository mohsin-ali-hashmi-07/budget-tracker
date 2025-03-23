import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { UserDetailsService } from '../../services/user-details.service';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, RouterModule, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private sidebarService = inject(SidebarService)
  private router = inject(Router)
  private userDetails = inject(UserDetailsService)
  user = this.userDetails.getCurrentUser();

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  goToProfile(){
    this.router.navigate(['/user-profile']);
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('userDetails');

    this.router.navigate(['/login']);
  }
}
