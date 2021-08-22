/* eslint-disable @typescript-eslint/no-shadow */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { AppModuleAuthorize } from '../user/user.types';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _authenticationService: AuthenticationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    // get(): Observable<Navigation>
    // {
    //     return this._httpClient.get<Navigation>('api/common/navigation').pipe(
    //         tap((navigation) => {
    //             this._navigation.next(navigation);
    //         })
    //     );
    // }

    get(): Observable<Navigation> {
        if (!this._authenticationService.currentUserValue) {
            return new Observable<Navigation>();
        }

        const appModule =
            this._authenticationService.currentUserValue.appModule;
        const response: FuseNavigationItem[] =
            this.treeNavigationMapping(appModule);
        const navigation: Navigation = {
            compact: response,
            default: response,
            futuristic: response,
            horizontal: response,
        };

        return of(navigation).pipe(
            tap((_) => {
                this._navigation.next(navigation);
            })
        );
    }

    private treeNavigationMapping(module: AppModuleAuthorize[]) {
        return module.map(
            ({
                id,
                title,
                subtitle,
                type,
                path,
                icon,
                children = [],
                ...rest
            }) => {
                const o: FuseNavigationItem = { type };
                o.id = id.toString();
                o.title = title;
                o.subtitle = subtitle;
                o.link = path;
                o.type = type;
                o.icon = icon;
                if (children.length) {
                    o.children = this.treeNavigationMapping(children);
                }

                return o;
            }
        );
    }
}
