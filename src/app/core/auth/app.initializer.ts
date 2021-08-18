/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { AuthenticationService } from 'app/shared/services/authentication.service';

export function appInitializer(authenticationService: AuthenticationService) {
    if (authenticationService.currentUserValue) {
        return () => new Promise((resolve) => {
            // attempt to refresh token on app start up to auto authenticate
            // authenticationService.refreshToken().subscribe().add(resolve);
            authenticationService.refreshToken().subscribe(
                (res) => {
                    if (!res.data) {
                        return () => authenticationService.signOut();
                    } else {
                        return res;
                    }
                }
            ).add(resolve);
        });
    } else {
        return () => authenticationService.signOut();
    }
}

