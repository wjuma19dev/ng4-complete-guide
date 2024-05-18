import { Injectable } from "@angular/core";
import { Recipe } from "./recipe-list/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    recipes: Recipe[] = [
        new Recipe(
            1,
            'A test recipe',
            'Just only a test recipe',
            'https://www.allrecipes.com/thmb/bY__0Qfz3Migm4p04tBuLLkEdME=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/habanero-hellfire-chili-28e8a45172d840a4afc4166ca73b768f.jpeg',
            [
                new Ingredient('Papas', 12),
                new Ingredient('Arroz', 3)
            ]
        ),
        new Recipe(
            2,
            'A test 2 recipe',
            'Just only a test 2 recipe',
            'https://www.allrecipes.com/thmb/bY__0Qfz3Migm4p04tBuLLkEdME=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/habanero-hellfire-chili-28e8a45172d840a4afc4166ca73b768f.jpeg',
            [
                new Ingredient('Zanahorias', 2),
                new Ingredient('Tayota', 5)
            ]
        ),
    ];

    constructor( private slService: ShoppingListService ) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe( index: number ) {
      return this.recipes[index];
    }

    onAddIngredientToShoppingList( ingredients: Ingredient[] ) {
        this.slService.addIngredients(ingredients);
    }

}
