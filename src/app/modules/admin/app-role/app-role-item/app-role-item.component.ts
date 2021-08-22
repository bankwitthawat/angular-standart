/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
    Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModuleAuthorize } from 'app/core/user/user.types';
import { AccessAuthorize } from 'app/shared/constants/accessAuthorize';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, TreeNode } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppRoleService } from '../app-role.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null
    ): boolean {
        const isSubmitted = form && form.submitted;
        return !!(
            control &&
            control.invalid &&
            (control.dirty || control.touched || isSubmitted)
        );
    }
}

@Component({
    selector: 'app-app-role-item',
    templateUrl: './app-role-item.component.html',
    styleUrls: ['./app-role-item.component.scss'],
})
export class AppRoleItemViewComponent implements OnInit, OnDestroy {
    moduleName: string = 'Roles';
    authorizeAccess: AccessAuthorize;

    id: string;
    pageTitle: string;
    pageSubTitle: string;
    isLoading: boolean = false;
    submitted: boolean = false;

    moduleList: AppModuleAuthorize[] = [];
    moduleTreeList: TreeNode<AppModuleAuthorize>[];
    resultData: any[] = [];

    roleForm: FormGroup;
    matcher = new MyErrorStateMatcher();

    accessColCheck: boolean = false;
    createColCheck: boolean = false;
    viewColCheck: boolean = false;
    editColcheck: boolean = false;
    delColCheck: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    get form() {
        return this.roleForm.controls;
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authorizeSerive: AuthorizeService,
        private _authenSerive: AuthenticationService,
        private _appRoleService: AppRoleService,
        private _fb: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _messageService: MessageService
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

    initialPage(): void {
        if (+this.id) {
            this.pageTitle = 'Manage Role';
            this.pageSubTitle = 'Role Management, role review and manage';
        } else {
            this.pageTitle = 'Create New Role';
            this.pageSubTitle = 'Role Management, Create a new role';
        }

        this.roleForm = this._fb.group({
            name: [null, [Validators.required]],
            description: [null],
        });
    }

    setAuthorizeOptions(): void {
        this.authorizeAccess = this._authorizeSerive.setAccess(this.moduleName);
        this.authorizeAccess.pageMode = +this.id ? 'VIEW' : 'CREATE';
        console.log('this.authorizeAccess', this.authorizeAccess);
    }

    /**
     * Prepare data
     */
    initialData(): void {
        this.getModuleList();
    }

    getModuleList(): void {
        this.isLoading = true;
        this._spinner.show();

        this._appRoleService
            .getModuleList(this.id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (result) => {
                    console.log(result);
                    if (result && result.success) {
                        this.moduleList = result.data;

                        this.moduleTreeList = this.treeMapping(this.moduleList);
                        // console.log('this.moduleTreeList', this.moduleTreeList);
                    }
                    this.isLoading = false;
                    this._spinner.hide();
                },
                (error) => {
                    this.isLoading = false;
                    this._spinner.hide();
                }
            );
    }

    /**
     * View Fuctions
     */
    onBack(): void {
        this._router.navigate(['/app-role/roles']);
    }

    onSave(): void {
        console.log('result', this.moduleTreeList);
    }

    onSaveAndExit(isExit: boolean): void {

        if (this.roleForm.invalid) {
            this.roleForm.markAllAsTouched();
            return;
        }

        this._spinner.show();
        this.submitted = true;

        this.resultData = [];
        this.flatTreeResult(this.moduleTreeList);
        // console.log('result', this.resultData);

        const isNotAccess = (this.resultData.filter(item => item.isAccess === true).length === 0);
        // console.log('isNotAccess', isNotAccess);
        if (isNotAccess) {
            //set toast
            this._messageService.add({severity:'error', summary: 'Error', detail: 'Please specify module access for this role.'});
            this._spinner.hide();
            return;
        }

        const result = {
            id: this.id || 0,
            name: this.form.name.value,
            description: this.form.description.value,
            moduleList: [...this.resultData],
        };

        if (this.authorizeAccess.pageMode === 'CREATE') {
            this._appRoleService.craeteRole(result).subscribe(
                (response) => {
                    this._spinner.hide();

                    if (response.success) {
                        // show toast
                        this._messageService.add({severity:'success', summary: 'Success', detail: response.message});
                        if (isExit) {
                            this._router.navigate(['..'], {
                                relativeTo: this._route,
                            });
                        }
                    }
                },
                (error) => {
                    this._spinner.hide();
                }
            );
        } else if (this.authorizeAccess.pageMode === 'VIEW') {
            this._appRoleService.updateRole(result).subscribe(
                (response) => {
                    this._spinner.hide();
                },
                (error) => {
                    this._spinner.hide();
                }
            );
        }
    }

    rowSelectedAccess(
        rootNode: TreeNode<AppModuleAuthorize>[],
        nodeId: number,
        event: any
    ): void {
        for (const node of rootNode) {
            if (node.data.id === nodeId && !event.checked) {
                node.data.isCreate = event.checked;
                node.data.isView = event.checked;
                node.data.isEdit = event.checked;
                node.data.isDelete = event.checked;
            }

            if (node.children.length) {
                this.rowSelectedAccess(node.children, nodeId, event);
            }
        }
    }

    colSelectedAll(
        treeNodes: TreeNode<AppModuleAuthorize>[],
        colName: string,
        event: any
    ): void {
        for (const treeNode of treeNodes) {
            if (treeNode.data) {
                switch (colName.toUpperCase()) {
                    case 'ACCESS':
                        treeNode.data.isAccess = event.checked;
                        break;
                    case 'CREATE':
                        treeNode.data.isCreate = event.checked;
                        break;
                    case 'EDIT':
                        treeNode.data.isEdit = event.checked;
                        break;
                    case 'VIEW':
                        treeNode.data.isView = event.checked;
                        break;
                    case 'DELETE':
                        treeNode.data.isDelete = event.checked;
                        break;
                    default:
                        break;
                }
            }
            if (treeNode.children != null) {
                this.colSelectedAll(treeNode.children, colName, event);
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ private methods
    // -----------------------------------------------------------------------------------------------------

    private treeMapping(module: AppModuleAuthorize[]) {
        return module.map(({ children = [], ...data }) => {
            const o: TreeNode = { data, children };
            o.data = { ...data };
            o.expanded = true;
            if (children.length) {
                o.children = this.treeMapping(children);
            }

            return o;
        });
    }

    private flatTreeResult(rootNode: TreeNode<AppModuleAuthorize>[]): void {
        for (const node of rootNode) {
            const obj = node.data;
            if (obj.type === 'basic') {
                this.resultData.push({
                    id: obj.id,
                    title: obj.title,
                    subtitle: obj.subtitle,
                    type: obj.type,
                    icon: obj.icon,
                    path: obj.path,
                    isActive: obj.isActive,
                    sequence: obj.sequence,
                    parentID: obj.parentID,
                    isAccess: obj.isAccess,
                    isCreate: obj.isCreate,
                    isEdit: obj.isEdit,
                    isView: obj.isView,
                    isDelete: obj.isDelete,
                });
            }
            // else {
            //     this.resultData.push({
            //         id: obj.id,
            //         title: obj.title,
            //         subtitle: obj.subtitle,
            //         type: obj.type,
            //         icon: obj.icon,
            //         path: obj.path,
            //         isActive: obj.isActive,
            //         sequence: obj.sequence,
            //         parentID: obj.parentID,
            //         isAccess: false,
            //         isCreate: false,
            //         isEdit: false,
            //         isView: false,
            //         isDelete: false,
            //     });
            // }

            if (node.children.length) {
                this.flatTreeResult(node.children);
            }
        }
    }
}
