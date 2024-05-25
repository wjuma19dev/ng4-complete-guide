import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(
        private dataStorage: DataStorageService
    ) {}

    onDataStorage() {
        this.dataStorage.storeRecipes();
    }

    onFetchRecipes() {
        this.dataStorage.fetchRecipes().subscribe();
    }
}
