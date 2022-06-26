import { RecipeService } from './../../recipe.service';
import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from './../../recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe; //this is the values passed from recipe list comp
  // @Output() recipeSelectedItem =new EventEmitter<void>();

  recipeName:string;
  recImage:string;
  recDesc:string
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    //debugger;
    if(this.recipe!=null)
    {
      this.recipeName=this.recipe.name;
      this.recImage=this.recipe.imagePath;
      this.recDesc=this.recipe.description;
    }
  }

  onSelectedRecipeItem()
  {
   // this.recipeSelectedItem.emit();
   this.recipeService.recipeSelected.emit(this.recipe);
  }

}
