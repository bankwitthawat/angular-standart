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

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
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
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

     // for canactivate redirect to
     {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
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
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule) },
            // { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
            //main
            { path: 'profile', loadChildren: () => import('app/modules/auth/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'app-role', loadChildren: () => import('app/modules/admin/app-role/app-role.module').then(m => m.AppRoleModule) },
            { path: 'app-user', loadChildren: () => import('app/modules/admin/app-user/app-user.module').then(m => m.AppUserModule) },
            { path: 'demo', loadChildren: () => import('app/modules/demo/demo.module').then(m => m.DemoModule) },


             // 404 & Catch all
             {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/auth/error/error-404/error-404.module').then(m => m.Error404Module)},
             {path: '**', redirectTo: '404-not-found'}
        ]
    },

   
];
