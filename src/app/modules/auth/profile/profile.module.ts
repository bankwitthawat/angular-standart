import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { profilesRoutes } from './profiles.routing';
import { ProfileSettingsComponent } from './profile-setting/profile-setting.component';
import { ProfileSecurityComponent } from './profile-security/profile-security.component';
import { ProfileComponent } from './profile.component';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileSettingsComponent,
        ProfileSecurityComponent,
    ],
    imports     : [
        RouterModule.forChild(profilesRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class ProfileModule
{
}
