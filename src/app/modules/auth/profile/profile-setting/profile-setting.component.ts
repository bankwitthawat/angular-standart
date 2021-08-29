import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AppUserService } from 'app/modules/admin/app-user/app-user.service';
import { AppUserItemView } from 'app/shared/models/viewModels/appUserView';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import dayjs from 'dayjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'profile-setting',
    templateUrl: './profile-setting.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements OnInit {
    accountForm: FormGroup;
    userData: AppUserItemView;
    isLoading: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    get form() {
        return this.accountForm.controls;
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
        private _profileService: ProfileService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.accountForm = this._fb.group({
            username: [{ value: null, disabled: true }, [Validators.required]],
            role: [{ value: null, disabled: true }],
            email: [null, [Validators.email]],
            fName: [null],
            lName: [null],
            mobilePhone: [null],
            birthDate: [null],
        });

        this.initialData();
    }

    /**
     * Prepare data
     */
    initialData(): void {
        this.getUserById();
    }

    onSaveAndExit(isExit: boolean): void {
        if (this.accountForm.invalid || !this.userData) {
            this.accountForm.markAllAsTouched();
            return;
        }

        this._spinner.show();
        this.isLoading = true;

        const result = {
            // id: this.userData.id,
            // username: this.userData.username,
            fName: this.form.fName.value,
            lName: this.form.lName.value,
            email: this.form.email.value,
            mobilePhone: this.form.mobilePhone.value,
            birthDate: this.form.birthDate.value
                ? dayjs(this.form.birthDate.value).format('DD/MM/YYYY')
                : null,
        };

        // console.log(result);

        this._profileService.updateProfile(result).subscribe(
            (response) => {
                this._spinner.hide();
                this.isLoading = false;

                console.log(this.isLoading);

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
                this.isLoading = false;
            }
        );
    }

    onBack(): void {
        this._router.navigate(['/home']);
    }

    getUserById(): void {
        this._spinner.show();

        this._profileService
        .getUserProfile()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            (response) => {
                this._spinner.hide();

                if (response.success) {
                    this.userData = response.data;
                    this.accountForm.patchValue(this.userData);
                }

            },
            (error) => {
                this._spinner.hide();
            }
        );
    }
}
