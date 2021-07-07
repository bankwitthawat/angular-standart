import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from 'app/modules/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class _AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //     const currentUser = this.authenticationService.currentUserValue;
    //     if (currentUser) {
    //         // logged in so return true
    //         return true;
    //     }

    //     // not logged in so redirect to login page with the return url
    //     // this.authenticationService.autoLogout();
    //     this.router.navigate(['sign-in'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    private _check(redirectURL: string): boolean {
        const currentUser = this.authenticationService.currentUserValue;
        if (!currentUser) {
            this.router.navigate(['sign-in'], { queryParams: { returnUrl: redirectURL } });
            return false;
        }
        return true;
    }
}
