import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, ResponsePayload } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AlertComponent } from "../shared/alert/alert.component";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {

    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

    closeSubs: Subscription;

    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error = null;

    constructor(
        private authServices: AuthService,
        private router: Router,
        public componentfactoryResolver: ComponentFactoryResolver
    ) {}

    ngOnInit(): void {}

    private onShowErrorAlert(message: string) {
        
        const alertCmpFactory = this.componentfactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;

        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSubs = componentRef.instance.close.subscribe(() => {
            this.closeSubs.unsubscribe();
            hostViewContainerRef.clear();
        });   
         
    }

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
                this.onShowErrorAlert(errorMessage);
                this.error = errorMessage;
            }
        });

        authForm.resetForm();

    }

    onHandlerError() {
        this.error = null;
    }

    ngOnDestroy(): void {
        if(this.closeSubs) {
            this.closeSubs.unsubscribe();
        }
    }

}