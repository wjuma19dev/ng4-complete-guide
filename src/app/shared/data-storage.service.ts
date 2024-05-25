import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe-list/recipe.model";
import { map, tap } from "rxjs";

@Injectable()
export class DataStorageService {

    baseURL: string = 'https://ng-complete-guide-37c43-default-rtdb.firebaseio.com/recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.baseURL, recipes)
            .subscribe((response) => {
                console.log(response)
            })
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.baseURL)
        .pipe(
            map((recipes: Recipe[]) => {
                
                return recipes.map(
                        recipe => ({ 
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : [] 
                        })
                    )

            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        )
        // .subscribe(
        //     (recipes) => {
        //         this.recipeService.setRecipes(recipes);
        //     }
        // )
    }
}