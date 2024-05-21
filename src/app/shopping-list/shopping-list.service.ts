// import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

    startedEditing = new Subject<number>();
    ingredientChanged = new Subject<Ingredient[]>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient( index: number ): Ingredient {
        return this.ingredients.slice()[index];
    }

    addIngredient( ingredient: Ingredient ) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredients( ingredients: Ingredient[] ) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient( index: number, newIngrediente: Ingredient ) {
        this.ingredients[index] = newIngrediente;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient( index: number ) {
        this.ingredients.splice( index, 1 );
        this.ingredientChanged.next(this.ingredients.slice());
    }

}
