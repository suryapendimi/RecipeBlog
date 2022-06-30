import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService{
  recipeChanged=new Subject<Recipe[]>();
   // recipeSelected=new Subject<Recipe>();
   /*  private recipes: Recipe[]=[
        new Recipe('Apple Pie',
        'It is a deseart',
        'https://media.istockphoto.com/photos/slice-of-apple-pie-on-a-plate-isolalted-on-a-white-background-picture-id184350005?b=1&k=20&m=184350005&s=170667a&w=0&h=Ls_1JleYq5ekFI3qMqNZIcP8iKq3awZlH33xnkHt3j8='
        ,[new Ingredient('Crust',1),
        new Ingredient('Apples',5),
        new Ingredient('BrwonSugar',100)
        ]),
        new Recipe('Chocolate Cream Cake',
        'It is a my Favorite deseart',
        'https://www.giftmyemotions.com/image/cache/floralnation/amazone/0133-800x800.jpg'
        ,[new Ingredient('White Four',100),
        new Ingredient('Butter',5),
        new Ingredient('Cream',100),
        new Ingredient('Sugar',200)
        ]),
        new Recipe('Mixed Veg Pizza',
        'Yummy Yummy Pizza',
        'https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/otpgblyzomhf5audk4m2'
        ,[new Ingredient('White Four',100),
        new Ingredient('Veggies',5),
        new Ingredient('Olives',20),
        new Ingredient('Cheese',10)
        ]),
    
      ]; */

      private recipes: Recipe[]=[];
      constructor(private shoppingLstService:ShoppingListService){

      }
      
      setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
      }
      getRecipes(){
        return this.recipes.slice();
        //returns a new array so we can't access a original recipes array.

      }

      addIngredientToShoppingList(ingredients:Ingredient[]){
        this.shoppingLstService.addIngredients(ingredients);
      }

      getRecipe(index:number)
      {
        return this.recipes[index];
      }

      addRecipe(recipe:Recipe)
      {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
        debugger;
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index:number)
      {
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());

      }
}