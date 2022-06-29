import { UserService } from './../auth/user.service';
import { Subscription, Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { Component,EventEmitter, Input, Output } from "@angular/core";
import { LoggedInUser } from '../models/ILoggedInUser';

@Component({
    selector:'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{   

   loggedin: Observable<LoggedInUser[]>
     showFullMenu:boolean=false;
   loginSuccessCheck:boolean=false;
   loggedIn: Observable<LoggedInUser>;
   constructor(private router: Router,private userservice:UserService){ }

   ngOnInit(): void 
   {
         if(sessionStorage.getItem("CurrentLogin"))
        this.loginSuccessCheck= true;
        else
        this.loginSuccessCheck= false;
   
        if(this.loginSuccessCheck){
     this.showFullMenu=true;
   }     
    
   } 

   onlogout(){
    //debugger;    
    sessionStorage.removeItem("CurrentLogin");
    
    this.loginSuccessCheck=false;
    this.router.navigate(['login']);
  }


  onAboutClick(){   
     this.router.navigate(['about']);
   }

   onContactClick(){   
     this.router.navigate(['contact']);
   }
}
