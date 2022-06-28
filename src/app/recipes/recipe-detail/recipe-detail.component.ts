import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeHttpService } from '../recipe-http.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipe:Recipe;
   id:number;
  constructor(private recipehttpService:RecipeHttpService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    debugger;
    this.route.params
    .subscribe(
      (params: Params)=> {
      this.id= +params['id']; //+ is typecasting into number       
      this.getRecipeById(this.id)
    }
    );
   
  }

  getRecipeById(id: number): void {
    this.recipehttpService.getRecipe(id)
      .subscribe({
        next: (data) => {
          this.recipe = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  onAddToShoppingList()
  {
    this.recipehttpService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe()
  {
    debugger;
    //this.router.navigate(['edit'],{relativeTo:this.route});
    this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  // 
  }

  onDeleteRecipe(){
    // this.router.navigate(['../',this.id,'edit'],
    // {relativeTo:this.route});
    this.recipehttpService.deleteRecipe(this.id);
     this.router.navigate(['/recipes']);
  }

}
