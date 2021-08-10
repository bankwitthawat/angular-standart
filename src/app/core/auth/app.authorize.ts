import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/modules/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AppModuleAuthorize {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {

    }

    searchTreeNode(currentNode: AppModuleAuthorize, matchingTitle: string): boolean{
        return true;
    }

}
