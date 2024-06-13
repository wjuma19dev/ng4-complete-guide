import { NgModule } from '@angular/core';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
  providers: [
    RecipeService,
    ShoppingListService,
    provideHttpClient(withInterceptors([
      AuthInterceptor
    ])),
    provideClientHydration(),
    provideHttpClient( withFetch() )
  ]
})
export class CoreModule {}