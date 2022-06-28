import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './shared/contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { AboutComponent } from './shared/about/about.component';

const routes: Routes = [
  {path:'',component: LoginComponent},
  {path:'signup',component: SignupComponent},
  {path:'login',component: LoginComponent},
  {path:'recipes',redirectTo:'/recipes',pathMatch:'full'},  
  {path:'recipes',component: RecipesComponent,
  children:[
    {path:'', component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent},
    {path:':id/edit',component:RecipeEditComponent}
   ]},
  {path:'shopping-list',component: ShoppingListComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
