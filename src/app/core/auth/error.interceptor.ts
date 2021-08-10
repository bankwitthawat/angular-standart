import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/modules/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {
            let error = 'Service unavailable.';
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.signOut();
            }

            error = err.error.message || err.error;
            console.log(error);
            return throwError(error);
        }));
    }

}