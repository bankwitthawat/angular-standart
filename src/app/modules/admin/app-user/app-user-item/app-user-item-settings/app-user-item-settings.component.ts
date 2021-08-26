import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from 'app/modules/admin/app-role/app-role-item/app-role-item.component';
import { AccessAuthorize } from 'app/shared/constants/accessAuthorize';
import { OptionItems } from 'app/shared/models/common/optionsView';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUserService } from '../../app-user.service';
import * as dayjs from 'dayjs';
import { AppUserItemView } from 'app/shared/models/viewModels/appUserView';

@Component({
    selector: 'app-user-item-setting',
    templateUrl: './app-user-item-settings.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppUserItemViewSettingsComponent implements OnInit, OnDestroy {
    moduleName: string = 'Users';
    authorizeAccess: AccessAuthorize;

    id: string;
    pageTitle: string;
    pageSubTitle: string;
    isLoading: boolean = false;
    submitted: boolean = false;

    isUnlockUser: boolean = false;
    rolesOptions: OptionItems[] = [];
    userForm: FormGroup;
    matcher = new MyErrorStateMatcher();
    userData: AppUserItemView;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    get form() {
        return this.userForm.controls;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authorizeSerive: AuthorizeService,
        private _fb: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _messageService: MessageService,
        private _appUserService: AppUserService
    ) {
        this.id = this._route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.setAuthorizeOptions();
        this.initialPage();
        this.initialData();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    setAuthorizeOptions(): void {
        this.authorizeAccess = this._authorizeSerive.setAccess(this.moduleName);
        this.authorizeAccess.pageMode = 'VIEW';
        console.log('this.authorizeAccess', this.authorizeAccess);

        if (
            this.authorizeAccess.isAccess === false ||
            this.authorizeAccess.isEdit === false ||
            !+this.id
        ) {
            this._messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Access Denied.',
            });
            this._router.navigate(['./'], { relativeTo: this._route.parent });
        }
    }

    initialPage(): void {
        this.pageTitle = 'Manage User';
        this.pageSubTitle = 'User Management, User review and manage';

        this.userForm = this._fb.group({
            username: [{ value: null, disabled: true }, [Validators.required]],
            roleId: [null, [Validators.required]],
            isForceChangePwd: [true],
            isActive: [true],
            email: [null],
            fName: [null],
            lName: [null],
            mobilePhone: [null],
            birthDate: [null],
        });
    }

    /**
     * Prepare data
     */
    initialData(): void {
        this.getRoleListToDropDownList();
        this.getUserById();
    }

    /**
     * View Fuctions
     */
    onBack(): void {
        this._router.navigate(['/app-user/users']);
    }

    onSaveAndExit(): void {
        // if (this.userForm.invalid) {
        //     this.userForm.markAllAsTouched();
        //     return;
        // }

        const result = {
            username: this.form.username.value,
            roleId: this.form.roleId.value,
            isForceChangePwd: this.form.isForceChangePwd.value,
            isActive: this.form.isActive.value,
            email: this.form.email.value,
            fName: this.form.fName.value,
            lName: this.form.lName.value,
            mobilePhone: this.form.mobilePhone.value,
            birthDate: this.form.birthDate.value
                ? dayjs(this.form.birthDate.value).format('DD/MM/YYYY')
                : null,
        };

        console.log(result);
    }

    getUserById(): void {
        this._appUserService
            .getUserById(+this.id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: any) => {
                this.userData = response.data;
                this.userForm.patchValue(this.userData);
                if (this.userData.loginAttemptCount) {
                    this.isUnlockUser = true;
                }
            });
    }

    getRoleListToDropDownList(): void {
        this._appUserService
            .getRoleListToDropDownList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: any) => {
                this.rolesOptions = response.data;
            });
    }

    unlockUser(): void {
        this._spinner.show();
        this.isLoading = true;

        this._appUserService
            .unlockUser(+this.id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response: any) => {
                    this._spinner.hide();
                    this.isLoading = false;
                    this.isUnlockUser = false;

                    if (response.success) {
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: response.message,
                        });

                        this.ngOnInit();
                    }
                },
                (error) => {
                    this._spinner.hide();
                    this.isLoading = false;
                    this.isUnlockUser = false;
                }
            );
    }
}
