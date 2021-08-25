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
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AppUserService } from '../../app-user.service';

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

    userForm: FormGroup;
    matcher = new MyErrorStateMatcher();

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
        this.authorizeAccess.pageMode = +this.id ? 'VIEW' : 'CREATE';
        console.log('this.authorizeAccess', this.authorizeAccess);

        if (this.authorizeAccess.isAccess === false) {
            this._messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Access Denied.',
            });
            this._router.navigate(['./'], { relativeTo: this._route.parent });
        }

        if (
            this.authorizeAccess.pageMode === 'CREATE' &&
            this.authorizeAccess.isCreate === false
        ) {
            this._messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Access Denied.',
            });
            this._router.navigate(['./'], { relativeTo: this._route.parent });
        }

        if (
            this.authorizeAccess.pageMode === 'VIEW' &&
            this.authorizeAccess.isView === false
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
        if (+this.id) {
            this.pageTitle = 'Manage User';
            this.pageSubTitle = 'User Management, User review and manage';
        } else {
            this.pageTitle = 'Create New User';
            this.pageSubTitle = 'User Management, Create a new user';
        }

        this.userForm = this._fb.group({
            name: [null, [Validators.required]],
            description: [null],
        });
    }

    /**
     * Prepare data
     */
    initialData(): void {}

    /**
     * View Fuctions
     */
    onBack(): void {
        this._router.navigate(['/app-user/users']);
    }
}
