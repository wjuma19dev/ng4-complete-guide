import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  @ViewChild( 'nameInput' ) nameInput: ElementRef;
  @ViewChild( 'amountInput' ) amountInput: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem() {
   
      const name = this.nameInput.nativeElement.value;
      const amount = this.amountInput.nativeElement.value;
      this.ingredientAdded.emit(new Ingredient(name, amount));

  }

}
