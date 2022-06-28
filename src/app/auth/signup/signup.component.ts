import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder,
    private userservice : UserService,
    private router: Router) {
    

   }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      fullname: ['',Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  signUp():void{
    this.userservice.create(this.signupForm.value)
    .subscribe((res)=>{    
        alert("SignUp Successful");
        this.signupForm.reset();
        this.router.navigate(['login']);
    }      
    ),(err=>{
      alert('Error Occurred');
    });
  }
}
