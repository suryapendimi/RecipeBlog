import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoggedInUser } from './../../models/ILoggedInUser';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ISignupUsers } from 'src/app/Models/ISignupUsers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // userObj:User=new User();
  signInUser: ISignupUsers;
  signInUsers:ISignupUsers[];
  isLoginFailed:boolean=false;
  loggedInUser: any;
  public loginForm !: FormGroup;
  constructor(private formBuilder : FormBuilder,
    private http : HttpClient,
    private router: Router,
    private userservice: UserService) {
    }
    
  ngOnInit(): void {
    debugger;  

    sessionStorage.removeItem("CurrentLogin");
    this.loginForm=this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]       
    });
  }
  
  fnValidateLogin(){
    debugger;
    this.userservice.getAll()
     .subscribe((data: ISignupUsers[]) => {
      this.signInUsers=data
        if (data && data.length>0) {       
       debugger;
          this.signInUser=this.signInUsers.find(x=>(x.email===this.loginForm.value.email) && (x.password===this.loginForm.value.password));
      
          this.loginForm.reset();
        if(this.signInUser)
        {
          var loginU=new LoggedInUser();
          loginU.fullName=data[0].fullName;
          loginU.id==data[0].id;
          loginU.email=data[0].email;
          sessionStorage.setItem("CurrentLogin",JSON.stringify(loginU));
          this.loggedInUser=true;
           
          this.router.navigate(['recipes']).then(() => { window.location.reload(); });
          console.log(loginU);
        }
        else
        {         
          this.isLoginFailed=true;          
        }
      }
    });
  }
}