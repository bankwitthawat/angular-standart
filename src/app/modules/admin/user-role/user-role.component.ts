import { Component, ViewChild, Directive } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
    icon: any;
    select: any;
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { select: [], icon: [], position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { select: [], icon: [], position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { select: [], icon: [], position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { select: [], icon: [], position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { select: [], icon: [], position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { select: [], icon: [], position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { select: [], icon: [], position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { select: [], icon: [], position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { select: [], icon: [], position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
    selector: 'user-role',
    templateUrl: './user-role.component.html',
    styleUrls: ['./user-role.component.scss'],
    // encapsulation: ViewEncapsulation.None
    animations: fuseAnimations
})

export class UseRoleComponent {

    panelOpenState = false;

    displayedColumns: string[] = ['select', 'icon', 'position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
    /**
     * Constructor
     */
    constructor(
    ) {
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

}
