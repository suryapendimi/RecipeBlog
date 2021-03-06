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
    successMessageShow:boolean;
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
  //  this.recipehttpService.deleteRecipe(this.id);
   //  this.router.navigate(['/recipes']);

   this.recipehttpService.deleteRecipe(this.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.successMessageShow=true;         
          //this.refreshList();
          //alert('recipe deleted!')
        },
        error: (e) => console.error(e)
      });

      
  }

  onMessage()
  {
    this.successMessageShow=false;
    this.reloadComponent()
    //this.router.navigate(['../'],{relativeTo:this.route})
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['recipes']);
    }
}