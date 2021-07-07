import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddUserComponent } from './add-user.component';

const homeRoutes: Route[] = [
    {
        path     : '',
        component: AddUserComponent
    }
];

@NgModule({
    declarations: [
        AddUserComponent
    ],
    imports     : [
        RouterModule.forChild(homeRoutes),
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
export class AddUserModule
{
}
