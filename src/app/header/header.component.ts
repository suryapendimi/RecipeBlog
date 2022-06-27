import { DataStorageService } from './../shared/data-storage.service';
import { Component,EventEmitter, Output } from "@angular/core";


@Component({
    selector:'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    /* @Output() featureSelected=new EventEmitter<string>();
    onSelect(feature:string){
         this.featureSelected.emit(feature);
       */
   // }
   
   constructor(private dataService:DataStorageService){

   }

   onPostDataToServer(){
    debugger;
    this.dataService.storeRecipes();
   }

   onFetchDataFromServer()
   {
        this.dataService.fetchRecipes();
   }
}