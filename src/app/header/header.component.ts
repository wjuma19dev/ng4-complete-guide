import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated: boolean = false;

    constructor(
        private dataStorage: DataStorageService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe({
            next: user => {
                this.isAuthenticated = !!user;
            }
        })
    }

    onDataStorage() {
        this.dataStorage.storeRecipes();
    }

    onFetchRecipes() {
        this.dataStorage.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}
