import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AccessAuthorize } from 'app/shared/constants/accessAuthorize';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-app-user-list',
    templateUrl: './app-user-list.component.html',
    styleUrls: ['./app-user-list.component.scss'],
})
export class AppUserListViewComponent implements OnInit, OnDestroy {
    authorizeAccess: AccessAuthorize;
    moduleName: string = 'Users';
    isLoading: boolean = false;

    searchFrom: FormGroup;

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
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this.setAuthorizeOptions();
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
          name: [''],
      });
  }
}
