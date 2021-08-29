import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { AppModuleAuthorize } from 'app/core/user/user.types';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._checkAuth(redirectUrl);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._checkAuth(redirectUrl);
    }


    private _checkAuth(redirectURL: string): Observable<boolean> {
        const currentUser = this.authenticationService.currentUserValue;
        console.log('_checkAuth');

        if ( !currentUser ) {
            this.router.navigate(['sign-in'], { queryParams: { returnUrl: redirectURL } });
            return of(false);
        }

        if (currentUser && currentUser.isForceChangePwd) {
            this.router.navigate(['reset-password']);
            return of(false);
        }

        return of(true);
    }

}
