import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeHttpService {
  recipeChanged=new Subject<Recipe[]>();
  baseUrl:string="http://localhost:3000/recipes"
  private recipes: Recipe[]=[];
      constructor(private shoppingLstService:ShoppingListService, private http:HttpClient){

      }

      setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
      }

      getRecipes(){
        this.http.get<Recipe[]>(this.baseUrl)
        .subscribe(res =>{          
            return this.recipes=res;
          }),
          (err:any)=>{
          alert("something went wrong");
        };
        
        }
      //  return this.recipes.slice();
        //returns a new array so we can't access a original recipes array.

      

      addIngredientToShoppingList(ingredients:Ingredient[]){
        this.shoppingLstService.addIngredients(ingredients);
      }

      getRecipe(index:number)
      {        
        this.http.get<Recipe[]>(this.baseUrl)
        .subscribe(res =>{          
            return this.recipes=res;
          }),
          (err:any)=>{
          alert("something went wrong");
        };

        return this.recipes[index];
      }

      addRecipe(recipe:Recipe)
      {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index:number)
      {
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());

      }
}