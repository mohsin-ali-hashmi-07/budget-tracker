import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule, RouterModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  
  private sidebarService = inject(SidebarService)
  private router = inject(Router)
 isCollapsed = this.sidebarService.isCollapsed$;

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
