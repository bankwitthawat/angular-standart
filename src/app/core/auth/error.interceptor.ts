import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/shared/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {
            if ([401, 403].includes(err.status) && this.authenticationService.currentUserValue) {
                // auto logout if 401 or 403 response returned from api
                this.authenticationService.signOut();
            }

            const error = (err && err.error && err.error.message) || `${err.statusText} Service unavailable, plaese try again.`;
            console.log(error);
            return throwError(error);
        }));
    }

}