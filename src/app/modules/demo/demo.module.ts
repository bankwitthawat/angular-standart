import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRolesComponent } from './report-roles/report-roles.component';
import { DemoRoutingModule } from './demo-routing.modules';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from 'app/shared/shared.module';
import { TreeTableModule } from 'primeng/treetable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


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
  NgxExtendedPdfViewerModule
];
@NgModule({
  declarations: [
    ReportRolesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DemoRoutingModule,
    ...MATERIAL,
    ...PRIMENG_TABLE
  ]
})
export class DemoModule { }
