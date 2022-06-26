import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[];
  constructor(private shoppingLstService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingLstService.getIngredient();
    this.shoppingLstService.ingredientsChanged
    .subscribe((
      ingredients:Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    )
  } 

}
