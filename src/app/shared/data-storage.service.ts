import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs';

@Injectable({providedIn:'root'})
export class DataStorageService{
    baseUrl:string="http://localhost:3000/"
    constructor(private http: HttpClient,private recipesService:RecipeService){}

    storeRecipes(){    
        const recipes=this.recipesService.getRecipes();
        return this.http.put(this.baseUrl + 'recipes',recipes)
        .subscribe(res =>{
           // console.log(res);
        }

        );

    }

    fetchRecipes(){    
       // const recipes=this.recipesService.getRecipes();
        return this.http.get<Recipe[]>(this.baseUrl + 'recipes')
        .pipe(map(recipes =>{
            return recipes.map(recipe =>{
                return {...recipe,ingredients:recipe.ingredients? recipe.ingredients:[]}
            });
        }))
        .subscribe(res =>{
           // console.log(res);
           this.recipesService.setRecipes(res);
        }

        );

    }
}