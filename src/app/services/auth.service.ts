import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.service';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: string | null;
}

const BASE_URL = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // Create auth state signal
  private authState = signal<AuthState>({
    user: null,
    isAuthenticated: false,
    role: null
  });

  // Computed signals for easy access
  readonly currentUser = computed(() => this.authState().user);
  readonly isAuthenticated = computed(() => this.authState().isAuthenticated);
  readonly role = computed(() => this.authState().role);

  setAuthState(user: User | null) {
    this.authState.set({
      user,
      isAuthenticated: !!user,
      role: user?.role || null
    });

    if (user?.role) {
      localStorage.setItem('role', user.role);
    } else {
      localStorage.removeItem('role');
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await this.http.get<User[]>(`${BASE_URL}?email=${email}&password=${password}`).toPromise();
      
      if (response && response.length > 0) {
        const user = response[0];
        this.setAuthState(user);
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  logout() {
    this.setAuthState(null);
  }
}
