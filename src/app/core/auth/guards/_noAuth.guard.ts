import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'app/modules/auth/auth.service';



@Injectable({ providedIn: 'root' })
export class _NoAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     const currentUser = this.authenticationService.currentUserValue;
    //     if (currentUser) {
    //         // logged in so return true
    //         this.router.navigate(['/home']);
    //         return false;
    //     }
    //     return true;
    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._check();
    }

    private _check(): boolean {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
