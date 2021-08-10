import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessAuthorize } from 'app/shared/constants/accessAuthorize';
import { AuthenticationService } from 'app/shared/services/authentication.service';
import { AuthorizeService } from 'app/shared/services/authorize.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './app-role-list.component.html',
  styleUrls: ['./app-role-list.component.scss']
})
export class AppRoleListViewComponent implements OnInit {

  authorizeAccess: AccessAuthorize;
  moduleName: string;

  constructor(
    private _authorizeSerive: AuthorizeService,
    private _authenSerive: AuthenticationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    // this.moduleName = this._activatedRoute.snapshot.url[0].path;
    this.moduleName = 'Customer';
  }

  ngOnInit(): void {
    this.setAuthorizeOptions();
  }

  setAuthorizeOptions(): void {
    const myModule = this._authenSerive.currentUserValue.appModule;
    this.authorizeAccess = this._authorizeSerive.findAuthorizeByModule2(myModule, this.moduleName);
    console.log('this.authorizeAccess', this.authorizeAccess);
    // if (this.authorizeAccess.isAccess === false) { }
  }

}
