import { RecipeHttpService } from './../recipe-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
//  @Output() recipeWasSelected=new EventEmitter<Recipe>();
   recipes:Recipe[];

   subscription :Subscription;
  constructor(private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute,
    private recipehttpService:RecipeHttpService,) { }

  ngOnInit(){   
    this.subscription =this.recipehttpService.recipeChanged
    .subscribe(
      (recipes:Recipe[]) =>{
        this.recipes=recipes;
      }
    )
    this.recipes=this.recipehttpService.getRecipes();
   // console.log(this.recipes);
  }

  /* onRecipeSelectedToPass(recipe:Recipe)
  {
    this.recipeWasSelected.emit(recipe);
  } */

  onNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
