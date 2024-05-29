import { ActivatedRoute, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "./recipe-list/recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { inject } from "@angular/core";
import { RecipeService } from "./recipe.service";

export const RecipeResolveService: ResolveFn<Recipe[]> = (
    route,
    state,
    dataStorageService: DataStorageService = inject(DataStorageService),
    recipeService: RecipeService = inject(RecipeService)
): Observable<Recipe[]> | Recipe[] => {

    const recipes = recipeService.getRecipes();
    if(recipes.length === 0) {
        return dataStorageService.fetchRecipes();
    } else {
        return recipes;
    }
}