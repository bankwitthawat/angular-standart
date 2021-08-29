import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ResetPasswordService } from './reset-password.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ResetPasswordComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    resetPasswordForm: FormGroup;
    showAlert: boolean = false;

    get form() {
        return this.resetPasswordForm.controls;
    }

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _resetPasswordService: ResetPasswordService,
        private _spinner: NgxSpinnerService,
        private _messageService: MessageService,
        private _router: Router,
        private _authService: AuthenticationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.resetPasswordForm = this._formBuilder.group(
            {
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(
                            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
                        ),
                    ],
                ],
                passwordConfirm: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'passwordConfirm'
                ),
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    resetPassword(): void {
        if (this.resetPasswordForm.invalid) {
            this.resetPasswordForm.markAllAsTouched();
            return;
        }

        this._spinner.show();
        const result = {
            password: this.form.password.value,
            passwordConfirm: this.form.passwordConfirm.value,
        };

        // console.log(result);

        this._resetPasswordService.forceChangePassword(result).subscribe(
            (response) => {
                this._spinner.hide();

                if (response.success) {
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: response.message,
                    });

                    this._authService.signOut();

                }
            },
            (error) => {
                this._spinner.hide();
            }
        );
    }


    signOut(): void {
        this._authService.signOut();
    }
}
