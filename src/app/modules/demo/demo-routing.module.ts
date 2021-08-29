import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportRolesComponent } from './report-roles/report-roles.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'rolesreport' },
    {
        path: 'rolesreport',
        component: ReportRolesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoRoutingModule {}
