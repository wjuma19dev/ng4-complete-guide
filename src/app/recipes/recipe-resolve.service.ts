import { ActivatedRoute, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "./recipe-list/recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { Injectable } from "@angular/core";

export const RecipeResolveService: ResolveFn<Recipe[]> = (
    route: ActivatedRoute,
    state: RouterStateSnapshot,
    dataStorageService: DataStorageService = inject(DataStorageService)
): Observable<Recipe[]> => {

    return dataStorageService.fetchRecipes();
}