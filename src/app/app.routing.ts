import { Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.component';

export const AppRoutes: Routes = [
    {
      path: '',
      component: DashboardPage
    },
    {
      path: '**',
      redirectTo: 'home'
    }
];
