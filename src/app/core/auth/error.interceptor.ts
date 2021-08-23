import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from './error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private error: HandleErrorService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err) => {
            const error = this.error.handleError(err);
            return throwError(error);
        }));
    }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(request).pipe(catchError((err) => {
    //         console.log(err);
    //         if ([401, 403].includes(err.status) && this.authenticationService.currentUserValue) {
    //             // auto logout if 401 or 403 response returned from api
    //             this.authenticationService.signOut();
    //         }

    //         const error = (err || err.error || err.error.message || err.message || err.error.errors.message[0]) || 'Service unavailable, plaese try again.';
    //         return throwError(error);
    //     }));
    // }

}
