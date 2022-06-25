import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[]=[
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10),
    new Ingredient('Cheese Slices',2),
    new Ingredient('Pizza base',5),
    new Ingredient('Pepers',2)
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient:Ingredient){
    debugger;
    console.log(ingredient);
    this.ingredients.push(ingredient);
  }


}
