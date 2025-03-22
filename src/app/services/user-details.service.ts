import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private userDetails = signal<any | null>(null);

  constructor() {
    this.loadUserDetails();
  }

  userDetails$ = this.userDetails.asReadonly();

  setUserDetails(user: any): void {
    this.userDetails.set(user);
    localStorage.setItem('userDetails', JSON.stringify(user)); 
    localStorage.setItem('role', 'user');
  }

  getCurrentUser(): any | null {
    return this.userDetails();
  }

  private loadUserDetails(): void {
    const user = localStorage.getItem('userDetails');
    if (user) {
      this.userDetails.set(JSON.parse(user));
    }
  }
}
