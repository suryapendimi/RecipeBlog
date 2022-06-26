import { Params } from '@angular/router';
import { ShoppingListService } from './../shopping-list.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  //@ViewChild('nameInput') nameInputRef:ElementRef;
  //@ViewChild('amountInput') amountInputRef:ElementRef;
  editedItemIndex:number;
  constructor(private shoppingLstService:ShoppingListService) { }
  subscription:Subscription;
  editMode:boolean=false;
  ngOnInit(): void {
    this.subscription=this.shoppingLstService.startedEditing
          .subscribe(
            (index: number)=>{
            this.editedItemIndex=index;
            this.editMode= true;
          }
          );

  }

  onAddItem(form:NgForm)
  {
 //   const ingName=this.nameInputRef.nativeElement.value;
  //  const ingAmount=this.amountInputRef.nativeElement.value
    //const newIngredient=new Ingredient(ingName,ingAmount);
   //console.log(newIngredient);
   const value=form.value;
   const newIngredient=new Ingredient(value.name,value.amount);
    this.shoppingLstService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
