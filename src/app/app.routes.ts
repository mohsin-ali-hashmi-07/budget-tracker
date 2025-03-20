import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "forgot-password", component: ForgotPasswordComponent },
    { path: "**", component: LoginComponent, }
];
