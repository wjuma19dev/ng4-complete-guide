import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild([
     { path: 'shopping-list', component: ShoppingListComponent }
    ])
  ],
  providers: [],
  exports: [
    ShoppingListComponent,
    ShoppingEditComponent
  ]
})
export class ShoppingListModule {}