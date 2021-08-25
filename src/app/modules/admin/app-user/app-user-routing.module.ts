import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUserItemViewComponent } from './app-user-item/app-user-item.component';
import { AppUserListViewComponent } from './app-user-list/app-user-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users'},
  { path: 'users', component: AppUserListViewComponent },
  { path: 'users/:id', component: AppUserItemViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppUserRoutingModule { }
