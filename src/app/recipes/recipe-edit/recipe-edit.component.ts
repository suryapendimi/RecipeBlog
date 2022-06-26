import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

    if(this.editMode){
      const recipe=this.recipeServce.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipedescription=recipe.description;
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName),
      'imagePath':new FormControl(recipeImagePath),
      'description':new FormControl(recipedescription)
    });
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

}
