import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
    icon: any;
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }

  const ELEMENT_DATA: PeriodicElement[] = [
    {icon:[],position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {icon:[],position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {icon:[],position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {icon:[],position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {icon:[],position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {icon:[],position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {icon:[],position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {icon:[],position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {icon:[],position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];


@Component({
    selector     : 'app-user',
    templateUrl  : './app-user.component.html',
    styleUrls: ['./app-user.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class AppuserComponent
{
    panelOpenState = false;

    displayedColumns: string[] = ['icon','position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
    )
    {
    }

    addUser(): void{
        this._router.navigate(['/add-user']);
    }
}
