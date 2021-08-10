import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoleListViewComponent } from './app-role-list/app-role-list.component';
import { AppRoleItemViewComponent } from './app-role-item/app-role-item.component';
import { AppRoleRoutingModule } from './app-role-routing.module';



@NgModule({
  declarations: [
    AppRoleListViewComponent, AppRoleItemViewComponent,

  ],
  imports: [
    CommonModule,
    AppRoleRoutingModule
  ]
})
export class AppRoleModule { }
