import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatButtonModule, RouterModule, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
