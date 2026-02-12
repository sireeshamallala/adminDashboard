import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [

    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./dashboard')
                .then(d => d.Dashboard),
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./users/users').then(u => u.Users)
            }
        ]
    },
];