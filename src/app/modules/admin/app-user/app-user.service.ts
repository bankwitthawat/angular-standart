import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppUserService {
    constructor(private _http: HttpClient) {}

    craeteUser(user: any): Observable<any> {
        return this._http.post<any>(
            `${environment.baseUrl}/api/appuser/craete-user`,
            user
        );
    }

    getUserList(search: any): Observable<any> {
        return this._http.post<any>(
            `${environment.baseUrl}/api/appuser/list`,
            search
        );
    }

    getRoleListToDropDownList(): Observable<any> {
        return this._http.get<any>(
            `${environment.baseUrl}/api/appuser/role-list`
        );
    }
}
