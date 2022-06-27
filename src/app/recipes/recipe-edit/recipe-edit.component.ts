import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeHttpService } from '../recipe-http.service';

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
    //private recipeServce:RecipeService,
    private recipehttpservice:RecipeHttpService,
    private router:Router) { }

  ngOnInit(): void {
    debugger;
    this.route.params
    .subscribe((param:Params) =>{
      this.id= + param['id'];
      this.editMode=param['id']!=null;
      //console.log(this.editMode);
      this.initForm();
    })
  }

  getRecipeById(id: number): void {
    this.recipehttpservice.getRecipe(id)
      .subscribe({
        next: (data) => {
          this.recipe = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  recipe:Recipe=null;
  private initForm(){
    let recipeName:string='';
    let recipeImagePath:string='';
    let recipedescription:string='';
    let recieIngredients=new FormArray([]);

    if(this.editMode){
    debugger;      
     this.getRecipeById(this.id);     

      recipeName=this.recipe.name;
      recipeImagePath=this.recipe.imagePath;
      recipedescription=this.recipe.description;
      if(this.recipe['ingredients']){
        for(let ingredient of this.recipe.ingredients){
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
    debugger;
    const newRecipe=new Recipe(  
      this.id=0,
    this.recipeForm.value['name'],
    this.recipeForm.value['description'],
    this.recipeForm.value['imagePath'],
    this.recipeForm.value['ingredients']);
     
    if(this.editMode){
      this.recipehttpservice.updateRecipe(this.id,newRecipe)
      .subscribe(data => {
        console.log(data)
        //this.router.navigate(['../'],{relativeTo:this.route})
      })      
    } else{
      this.recipehttpservice.addRecipe(newRecipe)
      .subscribe(data =>{
        console.log(data)
      })
    }
    this.recipehttpservice.recipeChanged.next
    this.onCancel();
   
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

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get['ingredients']).removeAt(index);
  }
}
