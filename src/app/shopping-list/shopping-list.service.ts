import{ Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();

    private ingredients:Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
        new Ingredient('Cheese Slices',2),
        new Ingredient('Pizza base',5),
        new Ingredient('Pepers',2)
      ];

getIngredient(){
    return this.ingredients.slice();
}

addIngredient(ingredient:Ingredient){
    //debugger;
    //console.log(ingredient);
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
   /*  for(let ingredient of ingredients){
        this.addIngredient(ingredient);
    } */

    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}