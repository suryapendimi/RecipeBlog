import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component,  OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
//  @Output() recipeWasSelected=new EventEmitter<Recipe>();
   recipes:Recipe[];
  constructor(private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(){   
    this.recipeService.recipeChanged
    .subscribe(
      (recipes:Recipe[]) =>{
        this.recipes=recipes;
      }
    )
    this.recipes=this.recipeService.getRecipes();
    console.log(this.recipes);
  }

  /* onRecipeSelectedToPass(recipe:Recipe)
  {
    this.recipeWasSelected.emit(recipe);
  } */

  onNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
