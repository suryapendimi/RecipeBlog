import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[];
  private subscription:Subscription;
  constructor(private shoppingLstService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingLstService.getIngredients();
    this.subscription=this.shoppingLstService.ingredientsChanged
    .subscribe((
      ingredients:Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    )
  } 
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppingLstService.startedEditing.next(index);
}

onDelete(index:number)
{
  
}

}