import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'home' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required', loadChildren: () =>
                import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
            },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule) },
            { path: 'home-detail', loadChildren: () => import('app/modules/home/home-detail/home-detail.module').then(m => m.HomeDetailModule) },
            { path: 'coming-soon', loadChildren: () => import('app/modules/home/coming-soon/coming-soon.module').then(m => m.ComingSoonModule) },
            { path: 'profile', loadChildren: () => import('app/modules/auth/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'app-user', loadChildren: () => import('app/modules/admin/app-user/app-user.module').then(m => m.AppUserModule) },
            { path: 'add-user', loadChildren: () => import('app/modules/admin/add-user/add-user.module').then(m => m.AddUserModule) },
            { path: 'user-role', loadChildren: () => import('app/modules/admin/user-role/user-role.module').then(m => m.UserRoleModule) },


            //main
            { path: 'app-role', loadChildren: () => import('app/modules/admin/app-role/app-role.module').then(m => m.AppRoleModule) },
        ]
    },
];
