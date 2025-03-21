import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { NavLayoutComponent } from './components/layouts/nav-layout/nav-layout.component';
import { ExpensesDashboardComponent } from './pages/expenses-dashboard/expenses-dashboard.component';
import { AnalyticsDashboardComponent } from './pages/analytics-dashboard/analytics-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "",  redirectTo: 'login', pathMatch: 'full' },
    { path: "login", component: LoginComponent , canActivate: [noAuthGuard]},
    { path: "signup", component: SignupComponent, canActivate: [noAuthGuard] },
    { path: "forgot-password", component: ForgotPasswordComponent, canActivate: [noAuthGuard] },
    {
        path: 'home',
        component: NavLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: "analytics", component: AnalyticsDashboardComponent },
          { path: "expense", component: ExpensesDashboardComponent },
          { path: "users", component: UserDashboardComponent }
        ]
      },
    { path: "**",  redirectTo: 'login' }
];
