import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected=new EventEmitter<Recipe>();
  recipes: Recipe[]=[
    new Recipe('Apple Pie','It is a deseart','https://media.istockphoto.com/photos/slice-of-apple-pie-on-a-plate-isolalted-on-a-white-background-picture-id184350005?b=1&k=20&m=184350005&s=170667a&w=0&h=Ls_1JleYq5ekFI3qMqNZIcP8iKq3awZlH33xnkHt3j8='),
    new Recipe('Chocolate Cream Cake','It is a my Favorite deseart','https://www.giftmyemotions.com/image/cache/floralnation/amazone/0133-800x800.jpg'),
    new Recipe('Mixed Veg Pizza','Yummy Yummy Pizza','https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/otpgblyzomhf5audk4m2')

  ];
  constructor() { }

  ngOnInit(): void {
   
    console.log(this.recipes);  
  }

  onRecipeSelectedToPass(recipe:Recipe)
  {
    this.recipeWasSelected.emit(recipe);
  }

}
