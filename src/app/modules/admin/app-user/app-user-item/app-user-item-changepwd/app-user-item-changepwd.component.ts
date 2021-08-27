import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseValidators } from '@fuse/validators';
import { AccessAuthorize } from 'app/shared/constants/accessAuthorize';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AppUserService } from '../../app-user.service';

@Component({
    selector: 'app-user-item-changepwd',
    templateUrl: './app-user-item-changepwd.component.html',
    // styleUrls: ['./app-user-item-changepwd.component.scss']
})
export class AppUserItemChangepwdComponent implements OnInit, OnDestroy {
    moduleName: string = 'Users';
    authorizeAccess: AccessAuthorize;

    id: string;
    isLoading: boolean = false;
    passwordForm: FormGroup;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    get form() {
        return this.passwordForm.controls;
    }

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authorizeSerive: AuthorizeService,
        private _fb: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _messageService: MessageService,
        private _appUserService: AppUserService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.id = this._route.snapshot.paramMap.get('id');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.setAuthorizeOptions();
        this.initialPage();
        // this.initialData();
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

    /**
     * Prepare data
     */
    initialPage(): void {
        this.passwordForm = this._fb.group(
            {
                password: [null, [Validators.required]],
                passwordConfirm: [null, [Validators.required]],
                isForceChangePwd: [true],
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'passwordConfirm'
                ),
            }
        );
    }

    onSaveAndExit(isExit: boolean): void {
        if (this.passwordForm.invalid) {
            this.passwordForm.markAllAsTouched();
            return;
        }

        this._spinner.show();
        this.isLoading = true;

        const result = {
            id: +this.id,
            password: this.form.password.value,
            passwordConfirm: this.form.passwordConfirm.value,
            isForceChangePwd: this.form.isForceChangePwd.value,
        };

        console.log(result);

        this._appUserService.changePassword(result).subscribe(
            (response) => {
                this._spinner.hide();
                this.isLoading = false;

                if (response.success) {
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: response.message,
                    });
                    this.passwordForm.reset();

                    if (isExit) {
                        this._router.navigate(['..'], {
                            relativeTo: this._route,
                        });
                    }
                }
            },
            (error) => {
                this._spinner.hide();
                this.isLoading = false;
            }
        );
    }

    onBack(): void {
        this._router.navigate(['/app-user/users']);
    }
}
