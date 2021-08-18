import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModuleAuthorize } from 'app/core/user/user.types';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { TreeNode } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppRoleService } from '../app-role.service';

@Component({
    selector: 'app-app-role-item',
    templateUrl: './app-role-item.component.html',
    styleUrls: ['./app-role-item.component.scss'],
})
export class AppRoleItemViewComponent implements OnInit, OnDestroy {
    id: string;
    pageTitle: string;
    pageSubTitle: string;
    isLoading: boolean = false;

    moduleList: AppModuleAuthorize[] = [];
    moduleTreeList: TreeNode[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authorizeSerive: AuthorizeService,
        private _authenSerive: AuthenticationService,
        private _appRoleService: AppRoleService,
        private _fb: FormBuilder
    ) {
        this.id = this._route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.initialPage();
        this.initialData();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    initialPage(): void {
        if (+this.id) {
            this.pageTitle = 'Manage Role';
            this.pageSubTitle = 'Role Management, role review and manage';
        } else {
            this.pageTitle = 'Create New Role';
            this.pageSubTitle = 'Role Management, Create a new role';
        }
    }

    initialData(): void {
        this.getModuleList();
    }

    onBack(): void {
        this._router.navigate(['/app-role/roles']);
    }

    getModuleList(): void {
        this.isLoading = true;
        this._appRoleService
            .getModuleList(this.id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (result) => {
                    console.log(result);
                    if (result && result.success) {
                        this.moduleList = result.data;

                        this.moduleTreeList = this.treeMapping(this.moduleList);
                        console.log('this.moduleTreeList', this.moduleTreeList);
                    }
                    this.isLoading = false;
                },
                (error) => {
                    this.isLoading = false;
                }
            );
    }

    private treeMapping(module: AppModuleAuthorize[])
    {
        return module.map(({
            children = [],
            ...data
        }) => {
            const o: TreeNode = { data, children };
            o.data = { ...data };
            o.expanded = true;
            if (children.length) {
                o.children = this.treeMapping(children);
            }

            return o;
        });
    }
}
