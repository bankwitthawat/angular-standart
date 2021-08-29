import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private _http: HttpClient) {}

    updateProfile(profile: any): Observable<any> {
        return this._http.put<any>(
            `${environment.baseUrl}/api/userprofile/updateuserprofile`,
            profile
        );
    }

    changePassword(user: any): Observable<any> {
        return this._http.put<any>(
            `${environment.baseUrl}/api/userprofile/change-password`,
            user
        );
    }

    getUserProfile(): Observable<any> {
        return this._http.get<any>(
            `${environment.baseUrl}/api/userprofile/getuserprofile`
        );
    }
}
