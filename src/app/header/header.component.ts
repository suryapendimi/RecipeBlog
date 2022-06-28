import { UserService } from './../auth/user.service';
import { Subscription, Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { DataStorageService } from './../shared/data-storage.service';
import { Component,EventEmitter, Input, Output } from "@angular/core";
import { LoggedInUser } from '../models/ILoggedInUser';

@Component({
    selector:'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    //@Input() loginSuccessCheck:boolean=false;
    /* @Output() featureSelected=new EventEmitter<string>();
    onSelect(feature:string){
         this.featureSelected.emit(feature);
       */
   // }

   loggedin: Observable<LoggedInUser[]>
     showFullMenu:boolean=false;
   loginSuccessCheck:boolean=false;
   loggedIn: Observable<LoggedInUser>;
   constructor(private dataService:DataStorageService,private router: Router,private userservice:UserService){ }

   ngOnInit(): void 
   {
         if(sessionStorage.getItem("CurrentLogin"))
        this.loginSuccessCheck= true;
        else
        this.loginSuccessCheck= false;
   //     this.loggedIn = this.userservice.userLoggedIn;

   if(this.loginSuccessCheck){
     this.showFullMenu=true;
   }     
    
   }

 /*   onPostDataToServer(){
    debugger;
    this.dataService.storeRecipes();
   }

   onFetchDataFromServer()
   {
        this.dataService.fetchRecipes();
   } */

   onlogout(){
    //debugger;    
    sessionStorage.removeItem("CurrentLogin");
   // alert('cleared')
    this.loginSuccessCheck=false;
    this.router.navigate(['login']);
  }


  onAboutClick(){
     //debugger;    
   //  sessionStorage.removeItem("CurrentLogin");
    // alert('cleared')
  //   this.loginSuccessCheck=false;
     this.router.navigate(['about']);
   }

   onContactClick(){
     //debugger;    
   //  sessionStorage.removeItem("CurrentLogin");
    // alert('cleared')
    // this.loginSuccessCheck=false;
     this.router.navigate(['contact']);
   }
}
