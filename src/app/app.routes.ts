import { Routes } from '@angular/router';
import { SignIn } from './auth/sign-in/sign-in';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => 
            import('./auth/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent :() =>
            import('./auth/sign-in/sign-in').then(c => SignIn)
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./dashboard/dashboard.routes').then(d => d.DASHBOARD_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'login'
    }

];
