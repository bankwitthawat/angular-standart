import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FuseConfirmationConfig,
    FuseConfirmationService,
} from '@fuse/services/confirmation';
import { AccessAuthorize } from 'app/shared/constants/accessAuthorize';
import { AppRoleView } from 'app/shared/models/viewModels/appRoleView';
import {
    GridCriteria,
    GridResults,
    Pagination,
    Paginator,
} from 'app/shared/models/viewModels/gridView';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppRoleService } from '../app-role.service';

@Component({
    selector: 'app-role-list',
    templateUrl: './app-role-list.component.html',
    styleUrls: ['./app-role-list.component.scss'],
})
export class AppRoleListViewComponent implements OnInit, OnDestroy {
    authorizeAccess: AccessAuthorize;
    moduleName: string = 'Roles';
    isLoading: boolean = false;

    roleCol: any[];
    roleColFrozen: any[];
    roleList: GridResults<AppRoleView>;
    roleSearch: GridCriteria<AppRoleView> = {
        criteria: {},
        gridCriteria: null,
    };
    searchFrom: FormGroup;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    get form(): any {
        return this.searchFrom.controls;
    }

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authorizeSerive: AuthorizeService,
        private _authenSerive: AuthenticationService,
        private _appRoleService: AppRoleService,
        private _fb: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _messageService: MessageService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.setAuthorizeOptions();
        this.initialForm();
        this.gridBindings();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Page Authorize
     */
    setAuthorizeOptions(): void {
        this.authorizeAccess = this._authorizeSerive.setAccess(this.moduleName);
        console.log('this.authorizeAccess', this.authorizeAccess);

        if (this.authorizeAccess.isAccess === false) {
            this._messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Access Denied.',
            });
            this._router.navigate(['./'], {
                relativeTo: this._activatedRoute.parent,
            });
        }
    }

    /**
     * Prepare data
     */
    initialForm(): void {
        this.searchFrom = this._fb.group({
            name: [''],
            description: [''],
        });
    }

    gridBindings(): void {
        this.isLoading = true;
        this._spinner.show();

        this._appRoleService
            .getRoleList(this.roleSearch)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.roleList = response;
                    this.isLoading = false;
                    this._spinner.hide();
                },
                (error) => {
                    this.isLoading = false;
                    this._spinner.hide();
                }
            );

        this.roleColFrozen = [{ field: '', header: '' }];

        this.roleCol = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'createdDate', header: 'Created Date' },
            { field: 'modifiedBy', header: 'Modified By' },
            { field: 'modifiedDate', header: 'Modified Date' },
        ];
    }

    setSearchDefualt(): void {
        this.roleSearch = {
            criteria: {},
            gridCriteria: null,
        };
    }

    paginate(e: Paginator) {
        this.roleSearch.gridCriteria = {
            page: e.page + 1,
            pageSize: e.rows,
            totalPages: e.pageCount,
            totalRecord: 0,
            sortby: '',
            sortdir: '',
        };

        this.gridBindings();
    }

    onSearch(): void {
        this.roleSearch = {
            criteria: {
                name: this.form.name.value,
                description: this.form.description.value,
            },
            gridCriteria: null,
        };

        this.gridBindings();
        this.setSearchDefualt();
    }

    onView(params: any): void {
        this._router.navigate(['/app-role/roles', params]);
    }

    onCreate(): void {
        this._router.navigate(['/app-role/roles', 'new']);
    }

    onDelete(rowData: any): void {
        console.log(rowData);

        // Set template
        const config = {
            title: `Remove ${rowData.name}`,
            message: 'Are you sure you want to remove this role permanently?',
        };

        // Get template
        const template = this._fuseConfirmationService.removeTemplate(config);

        // Open the confirmation and save the reference
        const dialogRef = this._fuseConfirmationService.open(template);

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            // console.log(result);
            if (result === 'confirmed') {
                this._spinner.show();
                this._appRoleService.deleteRole(rowData.id).subscribe(
                    (res) => {
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: res.message,
                        });
                        this._spinner.hide();
                        this.gridBindings();
                    },
                    (err) => {
                        this._spinner.hide();
                    }
                );
            }
            this._spinner.hide();
        });
    }
}
