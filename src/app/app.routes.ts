import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard), canActivate: [AuthGuard] },
    { path: 'list', loadComponent: () => import('./list/list').then(m => m.List), canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login'}
];
