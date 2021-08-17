import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { AppRoleService } from '../app-role.service';

@Component({
    selector: 'app-app-role-item',
    templateUrl: './app-role-item.component.html',
    styleUrls: ['./app-role-item.component.scss'],
})
export class AppRoleItemViewComponent implements OnInit {
    id: number;
    pageTitle: string;
    pageSubTitle: string;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authorizeSerive: AuthorizeService,
        private _authenSerive: AuthenticationService,
        private _appRoleService: AppRoleService,
        private _fb: FormBuilder
    ) {
        this.id = +this._route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.initialPage();
    }

    initialPage(): void {
        if (this.id) {
            this.pageTitle = 'Manage Role';
            this.pageSubTitle = 'Role Management, role review and manage';
        } else {
            this.pageTitle = 'Create New Role';
            this.pageSubTitle = 'Role Management, Create a new role';
        }
    }

    onBack(): void {
      this._router.navigate(['/app-role/roles']);
    }
}
