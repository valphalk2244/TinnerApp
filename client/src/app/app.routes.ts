import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { authGuard } from './_guard/auth.guard'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {
                path: 'members',
                loadComponent: () => import('./member/member.component').then(c => c.MemberComponent)
            },
            {
                path: 'member-profile/:username',
                loadComponent: () => import('./member/member-profile/member-profile.component').then(c => c.MemberProfileComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
            },
            {
                path: 'followers',
                loadComponent: () => import('./followers/followers.component').then(c => c.FollowersComponent)
            },
            {
                path: 'following',
                loadComponent: () => import('./following/following.component').then(c => c.FollowingComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'server-error',
        loadComponent: () => import('./sever-error/sever-error.component').then(c => c.SeverErrorComponent)
    },
    {
        path: 'member',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        loadComponent: () => import('./member/member.component').then(c => c.MemberComponent)
    },
    {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
]
