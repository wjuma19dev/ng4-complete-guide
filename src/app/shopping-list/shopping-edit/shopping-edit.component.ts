import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  @ViewChild( 'nameInput' ) nameInput: ElementRef;
  @ViewChild( 'amountInput' ) amountInput: ElementRef;

  constructor( private shoppingListService: ShoppingListService ) {}

  onAddItem() {
   
      const name: string = this.nameInput.nativeElement.value;
      const amount: number = this.amountInput.nativeElement.value;

      if(name.length <= 0 || amount <= 0) {
        alert('Ambos campos name & amount son obligatorios!');
        return;
      }

      const newIngredient: Ingredient = new Ingredient(name, amount);

      this.shoppingListService.addIngredient(newIngredient);

  }

}
