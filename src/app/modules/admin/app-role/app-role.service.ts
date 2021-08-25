import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoleView } from 'app/shared/models/viewModels/appRoleView';
import { GridCriteria } from 'app/shared/models/common/gridView';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AppRoleService {
    constructor(private _http: HttpClient) {}


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get role data
     */
    getRoleList(search: any): Observable<any> {
        return this._http
            .post<any>(`${environment.baseUrl}/api/approle/list`, search);
    }

    getModuleList(id: string): Observable<any> {
        return this._http.get<any>(`${environment.baseUrl}/api/approle/module-list?roleId=${id}`);
    }

    craeteRole(data: any): Observable<any> {
        return this._http.post<any>(`${environment.baseUrl}/api/approle/create-role`, data);
    }

    updateRole(data: any): Observable<any> {
        return this._http.post<any>(`${environment.baseUrl}/api/approle/update-role`, data);
    }

    deleteRole(id: any): Observable<any> {
        return this._http.post<any>(`${environment.baseUrl}/api/approle/delete-role`, { id: id });
    }
}
