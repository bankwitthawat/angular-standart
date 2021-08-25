import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FuseConfirmationConfig,
    FuseConfirmationService,
} from '@fuse/services/confirmation';
import { AccessAuthorize } from 'app/shared/constants/accessAuthorize';
import { AppRoleView } from 'app/shared/models/viewModels/appRoleView';
import {
    GridCriteria,
    GridResults,
    Pagination,
    Paginator,
} from 'app/shared/models/common/gridView';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { AuthorizeService } from 'app/shared/services/authorize.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReportRoleService } from '../report-roles/report-roles.service';

@Component({
  selector: 'app-report-roles',
  templateUrl: './report-roles.component.html',
  styleUrls: ['./report-roles.component.scss']
})
export class ReportRolesComponent implements OnInit {
  authorizeAccess: AccessAuthorize;
  moduleName: string = 'Roles';
  base64String: string;
  isLoading: boolean = false;
  roleSearch: GridCriteria<AppRoleView> = {
    criteria: {},
    gridCriteria: null,
  };
  searchFrom: FormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

    get form(): any {
        return this.searchFrom.controls;
    }

  constructor(
    private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authorizeSerive: AuthorizeService,
        private _authenSerive: AuthenticationService,
        private _appReportRolesService: ReportRoleService,
        private _fb: FormBuilder,
        private _spinner: NgxSpinnerService,
        private _messageService: MessageService,
        private _fuseConfirmationService: FuseConfirmationService
  ) { }

  ngOnInit(): void {
    this.setAuthorizeOptions();
    this.initialForm();
    this.reportBindings();
  }

  setAuthorizeOptions(): void {
    this.authorizeAccess = this._authorizeSerive.setAccess(this.moduleName);
    console.log('this.authorizeAccess', this.authorizeAccess);

    if (this.authorizeAccess.isAccess === false) {
        this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Access Denied.',
        });
        // this._router.navigate(['./'], {
        //     relativeTo: this._activatedRoute.parent,
        // });

        this._router.navigate(['/home']);
    }
  }


  initialForm(): void {
    this.searchFrom = this._fb.group({
        name: [''],
        description: [''],
    });
  }


  onSearch(): void {
    this.roleSearch = {
      criteria: {
          name: this.form.name.value,
          description: this.form.description.value,
      },
      gridCriteria: null,
    };
    this.reportBindings();
  }


  reportBindings(): void {
    this.isLoading = true;
    this._spinner.show();

    this._appReportRolesService
        .getReport(this.roleSearch)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            (response) => {
                this.base64String = response;
                this.isLoading = false;
                this._spinner.hide();
            },
            (error) => {
                this.isLoading = false;
                this._spinner.hide();
            }
        );
}

}
