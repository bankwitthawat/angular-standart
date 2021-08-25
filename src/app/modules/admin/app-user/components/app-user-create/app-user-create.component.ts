import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OptionItems } from 'app/shared/models/common/optionsView';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppUserService } from '../../app-user.service';

@Component({
    selector: 'app-app-user-create',
    templateUrl: './app-user-create.component.html',
    styleUrls: ['./app-user-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppUserCreateComponent implements OnInit, OnDestroy {
    createUserForm: FormGroup;
    rolesOptions: OptionItems[] = [];

    isLoading: boolean = false;

    get form() {
        return this.createUserForm.controls;
    }

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public _matDialogRef: MatDialogRef<AppUserCreateComponent>,
        private _messageService: MessageService,
        private _fb: FormBuilder,
        private _appUserService: AppUserService,
        private _spinner: NgxSpinnerService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this.initialForm();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    initialForm(): void {
        this.createUserForm = this._fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            role: [null, [Validators.required]],
            forceChangePassword: [true],
            isActive: [true],
            email: [null],
            fName: [null],
            lName: [null],
            mobilePhone: [null],
        });

        this.getRoleListToDropDownList();
    }

    onClose(): void {
        this._matDialogRef.close();
    }

    onCraete(): void {
        if (this.createUserForm.invalid) {
            this.createUserForm.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        this._spinner.show();

        const result = {
            username: this.form.username.value,
            password: this.form.password.value,
            roleId: this.form.role.value,
            forceChangePassword: this.form.forceChangePassword.value,
            isActive: this.form.isActive.value,
            email: this.form.email.value,
            fName: this.form.fName.value,
            lName: this.form.lName.value,
            mobilePhone: this.form.mobilePhone.value,
        };

        this._appUserService.craeteUser(result).subscribe(
            (res) => {
                this._spinner.hide();
                this.isLoading = false;
                if (res.success) {
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: res.message,
                    });

                    this._matDialogRef.close('confirmed');
                }
            },
            (err) => {
                this.isLoading = false;
                this._spinner.hide();
            }
        );

        console.log(result);
    }

    getRoleListToDropDownList(): void {
        this._appUserService
            .getRoleListToDropDownList()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: any) => {
                this.rolesOptions = response.data;
            });
    }
}
