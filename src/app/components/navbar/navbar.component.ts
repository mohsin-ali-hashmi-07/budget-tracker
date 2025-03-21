import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, RouterModule, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private sidebarService= inject(SidebarService)
  private router = inject(Router)

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
