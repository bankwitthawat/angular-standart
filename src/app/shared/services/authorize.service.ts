/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppModuleAuthorize } from 'app/core/user/user.types';
import { AccessAuthorize } from '../constants/accessAuthorize';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthorizeService {
    result: AccessAuthorize = { isAccess: false, isCreate: false, isEdit: false, isDelete: false, isView: false };

    constructor(
        private _router: Router,
        private _authenticationService: AuthenticationService
    ) { }

    findAuthorizeByModule(rootModule: AppModuleAuthorize[], titleMatching: string): AccessAuthorize {
        // const root = this._authenticationService.currentUserValue.appModule;
        console.log('rootModule', rootModule);

        for (const node of rootModule) {
            console.log('node', node);
            if (node.title.toLowerCase() === titleMatching.toLowerCase()) {
                this.result.isAccess = node.isAccess;
                this.result.isCreate = node.isCreate;
                this.result.isEdit = node.isEdit;
                this.result.isView = node.isView;
                this.result.isDelete = node.isDelete;
                return this.result;
            }

            if (node.children) {
                this.findAuthorizeByModule(node.children, titleMatching);
            }

            return this.result || null;
        }

        // rootModule[i].some((n: AppModuleAuthorize) => {
        //     console.log('n' ,n);
        //     if (n.title.toLocaleLowerCase === titleMatching.toLocaleLowerCase) {
        //         result.isAccess = n.isAccess;
        //         result.isCreate = n.isCreate;
        //         result.isEdit = n.isEdit;
        //         result.isView = n.isView;
        //         result.isDelete = n.isDelete;
        //         return result;
        //     }
        //     if (n.children) {
        //         return result = this.findAuthorizeByModule(n.children, titleMatching);
        //     }
        // });
        // return result || null;
        // return result;
    }

    findAuthorizeByModule2(rootNode: AppModuleAuthorize[], dirName: string): AccessAuthorize {
        const result: AccessAuthorize = { isAccess: false, isCreate: false, isEdit: false, isDelete: false, isView: false };
        for (let i = 0; i < rootNode.length; i++) {
            console.log('rootModule[i]', rootNode[i]);
            if (rootNode[i].title.toLowerCase() === dirName.toLowerCase()) {
                result.isAccess = rootNode[i].isAccess;
                result.isCreate = rootNode[i].isCreate;
                result.isEdit = rootNode[i].isEdit;
                result.isView = rootNode[i].isView;
                result.isDelete = rootNode[i].isDelete;
                // console.log('result' ,result);
                return result;
            }

            if (rootNode[i].children && rootNode[i].children.length) {
                const next = this.findAuthorizeByModule2(rootNode[i].children, dirName);
                if (next) {
                    return next;
                }
            }
        }
    }
}
