/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppModuleAuthorize } from 'app/core/user/user.types';
import { TreeNode } from 'primeng/api';
import { AccessAuthorize } from '../constants/accessAuthorize';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthorizeService {

    result: AccessAuthorize = {
        isAccess: false,
        isCreate: false,
        isEdit: false,
        isDelete: false,
        isView: false,
    };

    resultTreeNode: TreeNode<AppModuleAuthorize>[] = [];
    currentModule: any;

    constructor(
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _authenSerive: AuthenticationService
    ) {}

    setAccess(dirName: string): AccessAuthorize {
        // const myModule = this._authenSerive.currentUserValue.appModule;
        this._authenSerive.getCurrentUser$.subscribe((val) => {
            this.currentModule = val.appModule;
        });
        const result = this.findAuthorizeByModule(this.currentModule, dirName);
        return result;
    }

    findAuthorizeByModule(
        rootNode: AppModuleAuthorize[],
        dirName: string
    ): AccessAuthorize {
        for (let i = 0; i < rootNode.length; i++) {
            // console.log('rootModule[i]', rootNode[i]);
            if (rootNode[i].title.toUpperCase() === dirName.toUpperCase()) {
                this.result.isAccess = rootNode[i].isAccess;
                this.result.isCreate = rootNode[i].isCreate;
                this.result.isEdit = rootNode[i].isEdit;
                this.result.isView = rootNode[i].isView;
                this.result.isDelete = rootNode[i].isDelete;
                // console.log('result' ,result);
                return this.result;
            }

            if (rootNode[i].children && rootNode[i].children.length) {
                const next = this.findAuthorizeByModule(
                    rootNode[i].children,
                    dirName
                );
                if (next) {
                    return next;
                }
            }
        }
    }

}
