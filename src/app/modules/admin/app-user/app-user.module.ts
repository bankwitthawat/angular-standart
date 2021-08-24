import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppUserRoutingModule } from './app-user-routing.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TreeTableModule } from 'primeng/treetable';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'app/shared/shared.module';
import { AppUserListViewComponent } from './app-user-list/app-user-list.component';
import { AppUserItemViewComponent } from './app-user-item/app-user-item.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const PRIMENG_TABLE = [
  TableModule,
  PaginatorModule,
  TreeTableModule
];

const MATERIAL = [
  MatButtonModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatSortModule,
  MatInputModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatAutocompleteModule
];


@NgModule({
  declarations: [
    AppUserListViewComponent, AppUserItemViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppUserRoutingModule,
    ...MATERIAL,
    ...PRIMENG_TABLE
  ]
})
export class AppUserModule { }
