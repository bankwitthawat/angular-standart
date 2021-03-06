import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AccessAuthorize } from 'app/shared/constants/accessAuthorize';
import { AppUserView } from 'app/shared/models/viewModels/appUserView';
import {
    GridResults,
    GridCriteria,
    Paginator,
} from 'app/shared/models/common/gridView';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUserService } from '../app-user.service';
import { OptionItems } from 'app/shared/models/common/optionsView';
import { MatDialog } from '@angular/material/dialog';
import { AppUserCreateComponent } from '../components/app-user-create/app-user-create.component';

@Component({
    selector: 'app-app-user-list',
    templateUrl: './app-user-list.component.html',
    styleUrls: ['./app-user-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppUserListViewComponent implements OnInit, OnDestroy {
    authorizeAccess: AccessAuthorize;
    moduleName: string = 'Users';
    isLoading: boolean = false;

    searchFrom: FormGroup;
    userList: GridResults<AppUserView>;
    userSearch: GridCriteria<AppUserView> = {
        criteria: {},
        gridCriteria: null,
    };
    rolesOptions: OptionItems[] = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Getter
    // -----------------------------------------------------------------------------------------------------
    get form(): any {
        return this.searchFrom.controls;
    }

    constructor(
        private _router: Router,
        private _authorizeSerive: AuthorizeService,
        private _fb: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _messageService: MessageService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _appUserService: AppUserService,
        private _matDialog: MatDialog
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

            this._router.navigate(['/home']);
        }
    }

    /**
     * Prepare data
     */
    initialForm(): void {
        this.searchFrom = this._fb.group({
            username: [null],
            fullName: [null],
            role: [null],
            isActive: [null],
        });

        this.getRoleListToDropDownList();
    }

    gridBindings(): void {
        this.isLoading = true;
        this._spinner.show();

        this._appUserService
            .getUserList(this.userSearch)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    //   console.log(response);
                    this.userList = response;
                    this.isLoading = false;
                    this._spinner.hide();
                },
                (error) => {
                    this.isLoading = false;
                    this._spinner.hide();
                }
            );
    }

    setSearchDefualt(): void {
        this.userSearch = {
            criteria: {},
            gridCriteria: null,
        };
    }

    paginate(e: Paginator) {
        this.userSearch.gridCriteria = {
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
        const isActive =
            this.form.isActive.value === 'true'
                ? true
                : this.form.isActive.value === 'false'
                ? false
                : null;
        this.userSearch = {
            criteria: {
                username: this.form.username.value,
                fullName: this.form.fullName.value,
                roleId: this.form.role.value || null,
                isActive: isActive,
            },
            gridCriteria: null,
        };

        console.log(this.userSearch);

        this.gridBindings();
        this.setSearchDefualt();
    }

    onReset(): void {
        this.searchFrom.reset();
    }

    onCreate(): void {
        this._router.navigate(['/app-user/users', 'new']);
    }

    onCreateDialog(): void {
        const dialogRef = this._matDialog.open(AppUserCreateComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result === 'confirmed') {
                this.setSearchDefualt();
                this.gridBindings();
            }
        });
    }

    onView(params: any): void {
        // console.log(params);
        this._router.navigate(['/app-user/users', params]);
    }

    onDelete(): void {}

    getRoleListToDropDownList(): void {
        this._appUserService
            .getRoleListToDropDownList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: any) => {
                this.rolesOptions = response.data;
            });
    }
}
