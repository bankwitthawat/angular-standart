import { Component, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'user-role',
    templateUrl: './user-role.component.html',
    styleUrls: ['./user-role.component.scss'],
    // encapsulation: ViewEncapsulation.None
    animations: fuseAnimations
})

export class UseRoleComponent {


    checked = false;
    indeterminate = false;
    labelPosition: 'no' | 'yes' = 'yes';
    labelPosition1: 'no1' | 'yes1' = 'yes1';
    labelPosition2: 'no2' | 'yes2' = 'yes2';
    /**
     * Constructor
     */
    constructor(
    ) {
    }

}
