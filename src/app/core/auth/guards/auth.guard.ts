import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
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

    private _checkAuth(redirectURL: string): boolean {
        const currentUser = this.authenticationService.currentUserValue;
        if (!currentUser) {
            this.router.navigate(['sign-in'], { queryParams: { returnUrl: redirectURL } });
            return false;
        }
        return true;
    }

}
