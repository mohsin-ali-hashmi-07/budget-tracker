import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private isCollapsed = signal(false);

  isCollapsed$ = this.isCollapsed.asReadonly();

  toggleSidebar() {
    this.isCollapsed.update((current) => !current);
  }
}
