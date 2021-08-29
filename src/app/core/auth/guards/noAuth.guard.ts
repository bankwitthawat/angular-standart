import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'app/shared/services/authentication.service';



@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._check();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this._check();
    }

    private _check(): Observable<boolean> {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            this.router.navigate(['']);
            return of(false);
        }
        return of(true);
    }
}
