import { User } from 'app/core/user/user.types';

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    private currentUser: Observable<User>;
    private refreshTokenTimeout;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get getCurrentUser$(): Observable<User> {
        return this.currentUser;
    }

    private startRefreshTokenTimer() {
        const tokenTimeout = (this.currentUserValue.tokenTimeoutMins * 60 * 1000);
        console.log('token time left...', tokenTimeout);
        this.refreshTokenTimeout = setTimeout(() => setTimeout(() => this.refreshToken().subscribe(), tokenTimeout));
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
        console.log('token expired.');
    }


    signIn(username: string, password: string, rememberMe: boolean) {
        return this.http.post<any>(`${environment.baseUrl}/api/auth/login`, { username, password, rememberMe }, { withCredentials: true })
            .pipe(map((response) => {
                // console.log(response);
                const userResult = response.data;
                localStorage.setItem('currentUser', JSON.stringify(userResult));
                this.currentUserSubject.next(userResult);
                this.startRefreshTokenTimer();
                return response;
            }));
    }

    signOut(): void {
        if (this.currentUserValue) {
             this.revokeToken();
        }
        this.stopRefreshTokenTimer();
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        this.router.navigate(['/sign-out']);
    }

    revokeToken() {
        return this.http.post<any>(`${environment.baseUrl}/api/auth/logout`, {
            Token: this.currentUserValue.refreshToken
        }, { withCredentials: true }).subscribe();
    }

    refreshToken() {
        console.log('refreshToken Start!!');
        return this.http.post<any>(`${environment.baseUrl}/api/auth/refreshtoken`, {
            Token: this.currentUserValue.refreshToken,
        }, { withCredentials: true })
            .pipe(
                map((user) => {
                    const userResult = user.data;
                    localStorage.setItem('currentUser', JSON.stringify(userResult));
                    this.currentUserSubject.next(user.data);
                    this.startRefreshTokenTimer();
                    console.log('refreshToken Success!!');

                    return user;
                }));
    }

}
