import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe-list/recipe.model";

export class RecipeService {

    selectedRecipe = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe('A test recipe', 'Just only a test recipe', 'https://www.allrecipes.com/thmb/bY__0Qfz3Migm4p04tBuLLkEdME=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/habanero-hellfire-chili-28e8a45172d840a4afc4166ca73b768f.jpeg'),
        new Recipe('A test 2 recipe', 'Just only a test 2 recipe', 'https://www.allrecipes.com/thmb/bY__0Qfz3Migm4p04tBuLLkEdME=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/habanero-hellfire-chili-28e8a45172d840a4afc4166ca73b768f.jpeg'),
    ];

    getRecipes() {
        return this.recipes.slice();
    }
    
}