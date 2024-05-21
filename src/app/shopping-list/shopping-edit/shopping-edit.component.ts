import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy { 
  
  @ViewChild('f') singinForm: NgForm;

  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;

  constructor( private shoppingListService: ShoppingListService ) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        const { name, amount } = this.shoppingListService.getIngredient(index);
        this.singinForm.setValue({
          name,
          amount
        });
      }
    )
  }

  onAddItem(form: NgForm) {
    const { name, amount } = form.value;
    const newIngredient: Ingredient = new Ingredient(name, amount);

    if( this.editMode ) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
      this.onClear();
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
  }

  onClear() {
    this.singinForm.reset();
    this.editMode = false;
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
