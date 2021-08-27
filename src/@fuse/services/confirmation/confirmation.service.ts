import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';

@Injectable()
export class FuseConfirmationService
{
    private _defaultConfig: FuseConfirmationConfig = {
        title      : 'Confirm action',
        message    : 'Are you sure you want to confirm this action?',
        icon       : {
            show : true,
            name : 'heroicons_outline:exclamation',
            color: 'warn'
        },
        actions    : {
            confirm: {
                show : true,
                label: 'Confirm',
                color: 'warn'
            },
            cancel : {
                show : true,
                label: 'Cancel'
            }
        },
        dismissible: false
    };

    /**
     * Constructor
     */
    constructor(
        private _matDialog: MatDialog
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    open(config: FuseConfirmationConfig = {}): MatDialogRef<FuseConfirmationDialogComponent>
    {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(FuseConfirmationDialogComponent, {
            autoFocus   : false,
            disableClose: !userConfig.dismissible,
            data        : userConfig,
            panelClass  : 'fuse-confirmation-dialog-panel'
        });
    }

    successTemplate(template: any): FuseConfirmationConfig {
        const config: FuseConfirmationConfig = {
            title: `${template.title}`,
            message:
                `${template.message}`,
            icon: {
                show: true,
                name: 'heroicons_outline:check',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Ok',
                    color: 'success',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        };

        return config;
    }

    warningTemplate(template: any): FuseConfirmationConfig {
        const config: FuseConfirmationConfig = {
            title: `${template.title}`,
            message:
                `${template.message}`,
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Ok',
                    color: 'warning',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        };

        return config;
    }

    removeTemplate(template: any): FuseConfirmationConfig {
        const config: FuseConfirmationConfig = {
            title: `${template.title}`,
            message:
                `${template.message} <span class="font-medium">This action cannot be undone!</span>`,
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Remove',
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        };

        return config;
    }


}
