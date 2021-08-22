/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _authenSerive: AuthenticationService
    ) {}

    setAccess(dirName: string): AccessAuthorize {
        this._authenSerive.getCurrentUser$.subscribe((val) => {
            this.currentModule = val.appModule;
        });

        const result = this.findAuthorizeByModule(this.currentModule, dirName);
        if (!result?.isAccess) {
            this._router.navigate(['..'], { relativeTo: this._route });
            return null;
        }
        return result;
    }

    findAuthorizeByModule(
        rootNode: AppModuleAuthorize[],
        dirName: string
    ): AccessAuthorize {
        const result: AccessAuthorize = {
            isAccess: false,
            isCreate: false,
            isEdit: false,
            isDelete: false,
            isView: false,
        };

        for (let i = 0; i < rootNode.length; i++) {
            // console.log('rootModule[i]', rootNode[i]);
            if (rootNode[i].title.toUpperCase() === dirName.toUpperCase()) {
                result.isAccess = rootNode[i].isAccess;
                result.isCreate = rootNode[i].isCreate;
                result.isEdit = rootNode[i].isEdit;
                result.isView = rootNode[i].isView;
                result.isDelete = rootNode[i].isDelete;
                // console.log('result' ,result);
                return result;
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
