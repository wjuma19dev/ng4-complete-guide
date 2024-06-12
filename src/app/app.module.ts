import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { DataStorageService } from './shared/data-storage.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth-interceptor.service';

import { RecipeModule } from './recipes/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RecipeModule,
    ShoppingListModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RecipeService,
    DataStorageService,
    ShoppingListService,
    AuthService,
    // [{
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }],
    provideHttpClient(withInterceptors([
      AuthInterceptor
    ])),
    provideClientHydration(),
    provideHttpClient( withFetch() )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
