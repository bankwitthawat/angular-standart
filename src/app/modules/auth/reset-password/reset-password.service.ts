import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ResetPasswordService {
    constructor(private _http: HttpClient) {}

    forceChangePassword(user: any): Observable<any> {
        return this._http.post<any>(
            `${environment.baseUrl}/api/userprofile/force-change-password`,
            user
        );
    }
}
