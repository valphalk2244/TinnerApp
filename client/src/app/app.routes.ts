import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { authGuard } from './_guard/auth.guard'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'server-error',
        loadComponent: () => import('./server-error/server-error.component').then(c => c.ServerErrorComponent)
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {
                path: 'member',
                loadComponent: () => import('./member/member.component').then(c => c.MemberComponent)

            }, {
                path: 'profile',
                loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
            }
        ]
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
    },
    {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
]