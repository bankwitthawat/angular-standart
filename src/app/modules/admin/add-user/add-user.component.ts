import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    // encapsulation: ViewEncapsulation.None
    animations: fuseAnimations,
    providers: [DatePipe]
})

export class AddUserComponent implements OnInit {
    @ViewChild('supportNgForm') supportNgForm: NgForm;

    selectedValue: string;
    alert: any;
    addUserForm: FormGroup;
    birthDate: Date;
    value: string;
    viewValue: string;

    sexs: any[]=[
        {value: 'female', viewValue: 'Female'},
        {value: 'male', viewValue: 'Male'},
      ];

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        // Create the support form
        this.addUserForm = this._formBuilder.group({
            fname: [''],
            lname: [''],
            username: ['', Validators.required],
            email: [''],
            birthDate: [''],
            mobile: [''],
            message: ['']
        });
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    /**
     * Clear the form
     */
    clearForm(): void {
        // Reset the form
        this.supportNgForm.resetForm();
    }

    sendForm(): void {
        // Send your form here using an http request
        console.log('Your message has been sent!');

        // Show a success message (it can also be an error message)
        // and remove it after 5 seconds
        this.alert = {
            type: 'success',
            message: 'Your request has been delivered! A member of our support staff will respond as soon as possible.'
        };
        // Clear the form
        this.clearForm();
    }
}
