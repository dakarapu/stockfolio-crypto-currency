import { Routes } from '@angular/router';
import { LoginPage } from "./login/login.component";
import { AuthGuard } from "./services/authguard.service";
import { DashboardPage } from './dashboard/dashboard.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: DashboardPage
    },
    {
        path: 'login',
        component: LoginPage
    },
    { path: '**', redirectTo: 'home' }
];
