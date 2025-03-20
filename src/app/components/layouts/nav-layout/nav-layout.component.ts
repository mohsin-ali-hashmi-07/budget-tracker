import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-nav-layout',
  imports: [NavbarComponent, RouterModule, SidebarComponent],
  templateUrl: './nav-layout.component.html',
  styleUrl: './nav-layout.component.scss'
})
export class NavLayoutComponent {

}
