import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, ResponsePayload } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {

    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error = null;

    constructor(
        private authServices: AuthService,
        private router: Router
    ) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {

        if (!authForm.valid) {
            return;
        }

        const { email, password } = authForm.value;
        let authObs: Observable<ResponsePayload>;

        this.isLoading = true;

        if (this.isLoginMode) {
            authObs = this.authServices.login(email, password);
        } else {
            authObs = this.authServices.signup(email, password);      
        }


        authObs.subscribe({
            next: response => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error: (errorMessage) => {
                this.isLoading = false;
                this.error = errorMessage;
            }
        });

        authForm.resetForm();

    }

}