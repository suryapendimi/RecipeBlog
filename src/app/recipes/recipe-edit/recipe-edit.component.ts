import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm:FormGroup
  
  constructor(private route:ActivatedRoute,
    private recipeServce:RecipeService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((param:Params) =>{
      this.id= + param['id'];
      this.editMode=param['id']!=null;
      //console.log(this.editMode);
      this.initForm();
    })
  }

  private initForm(){
    let recipeName:string='';
    let recipeImagePath:string='';
    let recipedescription:string='';
    let recieIngredients=new FormArray([]);

    if(this.editMode){
      const recipe=this.recipeServce.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipedescription=recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recieIngredients.push(
            new FormGroup({
            'name':new FormControl(ingredient.name,Validators.required),
            'amount':new FormControl(ingredient.amount,[
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
          );
        }
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipedescription,Validators.required),
      'ingredients':recieIngredients,
    });
  }

  onSubmit(){
    //console.log(this.recipeForm);
    const newRecipe=new Recipe(
    this.recipeForm.value['name'],
    this.recipeForm.value['description'],
    this.recipeForm.value['imagePath'],
    this.recipeForm.value['ingredients']);
     
    if(this.editMode){
      this.recipeServce.updateRecipe(this.id,newRecipe);
    } else{
      this.recipeServce.addRecipe(newRecipe);
    }
   
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
