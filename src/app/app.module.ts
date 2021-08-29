import {
    APP_INITIALIZER,
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { appInitializer } from './core/auth/app.initializer';
import { ErrorInterceptor } from './core/auth/error.interceptor';
import { JwtInterceptor } from './core/auth/jwt.interceptor';
import { AuthenticationService } from './shared/services/authentication.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';

const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,
};


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        //RouterModule.forRoot(appRoutes, routerConfig),
        RouterModule.forRoot(appRoutes),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),

        NgxSpinnerModule,
        ToastModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        MessageService,
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
