import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    returnUrl: string;
    isLoading: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        protected router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
    )
    {
    }

    get f() { return this.signInForm.controls; }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            username     : ['', Validators.required],
            password  : ['', Validators.required],
            rememberMe: ['']
        });


        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
     signIn(): void {

        if (this.signInForm.invalid) {
            return;
        }

        this.signInForm.disable();
        this.authenticationService.signIn(this.f.username.value, this.f.password.value, this.f.rememberMe.value)
            .pipe(first())
            .subscribe({
                next: (data) => {
                    // console.log(data);
                    this.signInForm.enable();
                    this.showAlert = true;

                    if (data.success) {
                        this.alert = { type: 'success', message: data.message };
                        setTimeout(() => this.router.navigate([this.returnUrl]), 1000);
                    }else {
                        this.alert = { type: 'error', message: data.message };
                    }

                },
                error: (error) => {
                    console.log('signIn',error);
                    this.signInForm.enable();
                    this.showAlert = true;
                    this.alert = {
                        type: 'error',
                        message: error
                    };
                }
            });


    }


    // signIn(): void
    // {


    //     // Return if the form is invalid
    //     if ( this.signInForm.invalid )
    //     {
    //         return;
    //     }

    //     // Disable the form
    //     this.signInForm.disable();

    //     // Hide the alert
    //     this.showAlert = false;

    //     // Sign in
    //     this._authService.signIn(this.signInForm.value)
    //         .subscribe(
    //             () => {

    //                 // Set the redirect url.
    //                 // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
    //                 // to the correct page after a successful sign in. This way, that url can be set via
    //                 // routing file and we don't have to touch here.
    //                 const  redirectURL =    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/signed-in-redirect';

    //                 // Navigate to the redirect url
    //                 this.router.navigateByUrl(redirectURL);

    //             },
    //             (response) => {

    //                 // Re-enable the form
    //                 this.signInForm.enable();

    //                 // Reset the form
    //                 this.signInNgForm.resetForm();

    //                 // Set the alert
    //                 this.alert = {
    //                     type   : 'error',
    //                     message: 'Wrong email or password'
    //                 };

    //                 // Show the alert
    //                 this.showAlert = true;
    //             }
    //         );
    // }
}
