import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { AppuserComponent } from './app-user.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: AppuserComponent
    }
];

@NgModule({
    declarations: [
        AppuserComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        TranslocoModule,
        SharedModule,
        MatExpansionModule,
        MatFormFieldModule,
        CommonModule,
        SharedModule,
        MatInputModule,
        MatPaginatorModule
    ]
})
export class AppUserModule
{
}
