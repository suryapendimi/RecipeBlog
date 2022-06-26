import { Params } from '@angular/router';
import { ShoppingListService } from './../shopping-list.service';
import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('f') shoppingListForm:NgForm;

  editedItemIndex:number;
  editedItem:Ingredient;
  
  constructor(private shoppingLstService:ShoppingListService) { }
  subscription:Subscription;
  editMode:boolean=false;
  ngOnInit(): void {
    this.subscription=this.shoppingLstService.startedEditing
          .subscribe(
            (index: number)=>{
            this.editedItemIndex=index;
            this.editMode= true;
            this.editedItem=this.shoppingLstService.getIngredient(index);
            this.shoppingListForm.setValue({
              name:this.editedItem.name,
              amount:this.editedItem.amount
            });
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
   if(this.editMode){
    this.shoppingLstService.updateIngredient(this.editedItemIndex,newIngredient);
   }else{
    this.shoppingLstService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear()
  {
    this.editMode=false;  
    this.editedItemIndex=9999;
    this.shoppingListForm.resetForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.shoppingLstService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
