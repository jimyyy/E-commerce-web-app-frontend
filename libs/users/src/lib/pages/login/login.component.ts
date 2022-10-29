import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFormGroup!:FormGroup;
  isSubmitted=false;
  authError=false;
  authMessage='Email or Password are wrong';
  constructor(private formBuilder:FormBuilder,private auth:AuthService,
    private localstorageService:LocalstorageService,
    private router:Router) {}

  ngOnInit(): void {
    this._initFormGroup();
  }

  private _initFormGroup(){
    this.loginFormGroup=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls;
  }

  onSubmit(){
    this.isSubmitted=true;
    const loginData={
      email:this.loginForm['email'].value,
      password:this.loginForm['password'].value

    }

    if(this.loginFormGroup.invalid){return;} 
    this.auth.login(loginData.email,loginData.password).subscribe(user=>{
      this.authError=false;
      this.localstorageService.setItem(user.token);
      this.router.navigate(['/'])
       
      
    },
    (error:HttpErrorResponse)=>{
     
      this.authError=true;
      if(error.status !==400){
        this.authMessage='Error in the server,please try again later!';

      }
      
     
      
    }
    )
    
  }
  
}
