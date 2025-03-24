import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { NavLayoutComponent } from './components/layouts/nav-layout/nav-layout.component';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "",  redirectTo: 'login', pathMatch: 'full' },
    { path: "login", component: LoginComponent , canActivate: [noAuthGuard]},
    { path: "signup", component: SignupComponent, canActivate: [noAuthGuard] },
    { path: "forgot-password", component: ForgotPasswordComponent, canActivate: [noAuthGuard] },
    {
      path: "user-profile",
      loadComponent: () => import('./pages/user-profile/user-profile.component').then(m => m.UserProfileComponent),
      canActivate: [authGuard]
    },
    {
      path: 'home',
      component: NavLayoutComponent,
      canActivate: [authGuard],
      children: [
        {
          path: "analytics",
          loadComponent: () => import('./pages/analytics-dashboard/analytics-dashboard.component').then(m => m.AnalyticsDashboardComponent)
        },
        {
          path: "expense",
          loadComponent: () => import('./pages/expenses-dashboard/expenses-dashboard.component').then(m => m.ExpensesDashboardComponent)
        },
        {
          path: "users",
          loadComponent: () => import('./pages/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent)
        }
      ]
    },
    { path: "**",  redirectTo: 'login' }
];
