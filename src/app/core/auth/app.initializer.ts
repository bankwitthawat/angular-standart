
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/modules/auth/auth.service';


export const appInitializer = (authenticationService: AuthenticationService, router: Router) => {
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
};
