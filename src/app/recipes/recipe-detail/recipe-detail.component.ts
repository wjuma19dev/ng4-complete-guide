import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

  @Input('recipeSelected') recipe: Recipe;

  constructor( private recipeService: RecipeService ) {}

  onAddToShoppingList() {
    this.recipeService.onAddIngredientToShoppingList(this.recipe.ingredients);
  }

}
