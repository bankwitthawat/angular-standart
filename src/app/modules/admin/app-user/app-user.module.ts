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
import { MatSelectModule } from '@angular/material/select';
import { AppUserItemViewSettingsComponent } from './app-user-item/app-user-item-settings/app-user-item-settings.component';
import { AppUserCreateComponent } from './components/app-user-create/app-user-create.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

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
  MatAutocompleteModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatDatepickerModule, MatNativeDateModule, MatMomentDateModule,
];

const MY_DATE_FORMATS = {
  parse: {
      dateInput: 'DD/MM/YYYY',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

const DIRECTIVE = [
  NgxTrimDirectiveModule
];


@NgModule({
  declarations: [
    AppUserListViewComponent,
    AppUserItemViewComponent,
    AppUserItemViewSettingsComponent,
    AppUserCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppUserRoutingModule,
    ...MATERIAL,
    ...PRIMENG_TABLE,
    ...DIRECTIVE
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class AppUserModule { }
