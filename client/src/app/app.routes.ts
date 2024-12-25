import { login } from './../../../server/src/types/account.type'
import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'

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
        path: 'members',
        loadComponent: () => import('./member/member.component').then(c => c.MemberComponent)
    },
    {
        path: 'server',
        loadComponent: () => import('./server-error/server-error.component').then(c => c.ServerErrorComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
    {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    }
]