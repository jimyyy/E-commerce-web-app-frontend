import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from '../../models/user';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [],
})
export class ForgotPasswordComponent implements OnInit {
  forgotpassword!:FormGroup;
  isSubmitted=false;
  constructor(private formbuilder:FormBuilder,private resetService:ResetPasswordService,private messageService:MessageService) {}

  ngOnInit(): void {
    this._initformGroup()
  }

  get forgotForm(){
    return this.forgotpassword.controls;
  }

  onSubmit(){
    this.isSubmitted=true;

  
     
     

    

    if(this.forgotpassword.invalid){
      return ;
    }

    const forgotData={
      email:this.forgotForm['email'].value,
      

    }

    this.resetService.requestReset(forgotData.email).subscribe(
      data=>{
        this.forgotpassword.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail:  "Reset password link send to email sucessfully.",
        });
      },

      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created',
        });
      }

    )
      
      
    
    

  }

  private _initformGroup(){
    this.forgotpassword=this.formbuilder.group({
      email:['',[Validators.required,Validators.email]]
    })

  }
}
