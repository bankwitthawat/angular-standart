import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoleItemViewComponent } from './app-role-item/app-role-item.component';
import { AppRoleListViewComponent } from './app-role-list/app-role-list.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'roles' },
    {
        path: 'roles',
        component: AppRoleListViewComponent,
    },
    {
        path: 'roles/:id',
        component: AppRoleItemViewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppRoleRoutingModule {}
