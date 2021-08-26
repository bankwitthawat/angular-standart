import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { AccessAuthorize } from 'app/shared/constants/accessAuthorize';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MyErrorStateMatcher } from '../../app-role/app-role-item/app-role-item.component';
import { AppUserService } from '../app-user.service';

@Component({
    selector: 'app-user-item',
    templateUrl: './app-user-item.component.html',
    styleUrls: ['./app-user-item.component.scss'],
})
export class AppUserItemViewComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'account';

    moduleName: string = 'Users';
    authorizeAccess: AccessAuthorize;
    id: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authorizeSerive: AuthorizeService,
        private _fb: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _messageService: MessageService,
        private _appUserService: AppUserService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {
        this.id = this._route.snapshot.paramMap.get('id');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Navigate to the panel
     *
     * @param panel
     */
    goToPanel(panel: string): void {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if (this.drawerMode === 'over') {
            this.drawer.close();
        }
    }

    /**
     * Get the details of the panel
     *
     * @param id
     */
    getPanelInfo(id: string): any {
        return this.panels.find(panel => panel.id === id);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
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
        // Setup available panels
        this.panels = [
            {
                id: 'account',
                icon: 'heroicons_outline:user-circle',
                title: 'Profile',
                description: 'Manage your user profile and private information',
            },
        ];

        if (this.authorizeAccess.pageMode === 'VIEW') {
            this.panels.push({
                id: 'security',
                icon: 'heroicons_outline:lock-closed',
                title: 'Change Your Password',
                description: 'Manage your password',
            });
        }

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Prepare data
     */
    initialData(): void {}

}
