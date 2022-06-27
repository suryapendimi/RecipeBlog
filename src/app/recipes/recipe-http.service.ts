import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
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

      getRecipes(): Observable<Recipe[]>{
        return this.http.get<Recipe[]>(this.baseUrl)
    
        }
      //  return this.recipes.slice();
        //returns a new array so we can't access a original recipes array.

      

      addIngredientToShoppingList(ingredients:Ingredient[]){
        this.shoppingLstService.addIngredients(ingredients);
      }
      
      getRecipe(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
      }

      addRecipe(recipe:Recipe): Observable<any> {
        debugger;
          const headers = { 'content-type': 'application/json'}  
          const body=JSON.stringify(recipe);
          console.log(body)
          return this.http.post(this.baseUrl, body,{'headers':headers});          
    
          //

        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
        }
      
      updateRecipe(id:number,newRecipe:Recipe): Observable<any> {  
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(newRecipe);
        console.log(body)   
        return this.http.put(this.baseUrl + '/'+id, body,{'headers':headers})
          .pipe(map((data) =>{
            console.log(data);
            return data;
          }),
         ((err) => {
           console.error(err);
           throw err;
         }
       ));     


      //{
      //  this.recipes[index]=newRecipe;
      //  this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(id:number)
      {
       // this.recipes.splice(index,1);
        //this.recipeChanged.next(this.recipes.slice());
        const headers = { 'content-type': 'application/json'}  
        return this.http.delete(this.baseUrl+'/'+id, {'headers':headers})
        .pipe(map((data) =>{
          return data;
        }),
       ((err) => {
         console.error(err);
         throw err;
       }
     ));     

      }
}