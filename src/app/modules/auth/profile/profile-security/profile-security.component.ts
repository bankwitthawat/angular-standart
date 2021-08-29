import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseValidators } from '@fuse/validators';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'profile-security',
    templateUrl: './profile-security.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSecurityComponent implements OnInit {
    securityForm: FormGroup;

    get form() {
        return this.securityForm.controls;
    }

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _profileService: ProfileService,
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
        this.securityForm = this._formBuilder.group(
            {
                currentPassword: ['', [Validators.required]],
                newPassword: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(
                            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
                        ),
                    ],
                ],
                newPasswordConfirm: [''],
            },
            {
                validators: FuseValidators.mustMatch(
                    'newPassword',
                    'newPasswordConfirm'
                ),
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onSaveAndExit(isExit: boolean): void {
        if (this.securityForm.invalid) {
            this.securityForm.markAllAsTouched();
            return;
        }

        this._spinner.show();
        const result = {
            currentPassword: this.form.currentPassword.value,
            password: this.form.newPassword.value,
            passwordConfirm: this.form.newPasswordConfirm.value,
        };

        this._profileService.changePassword(result).subscribe(
            (response) => {
                this._spinner.hide();

                if (response.success) {
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: response.message,
                    });

                    if (isExit) {
                        this._router.navigate(['/home']);
                    }
                }
            },
            (error) => {
                this._spinner.hide();
            }
        );
    }

    onBack(): void {
        this._router.navigate(['/home']);
    }
}
