import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { appInitializer } from './app.initializer';

@NgModule({
    imports  : [
        HttpClientModule
    ],
    providers: [
        AuthService,
        // {
        //     provide : HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi   : true
        // },
    ]
})
export class AuthModule
{
}
