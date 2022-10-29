import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styles: [],
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!:FormGroup;
  isSubmitted=false;
  resettoken!:any;
  CurrentState: any;
  constructor(private formbuilder:FormBuilder,private route:ActivatedRoute,private reset:ResetPasswordService) {
    
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.resettoken = params['resettoken'];
      console.log(this.resettoken);
      this.VerifyToken();
    });
    this._initformGroup();
  }

  VerifyToken() {
    this.reset.ValidPasswordToken(this.resettoken).subscribe(
      data => {
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

  private _initformGroup(){
    this.newPasswordForm=this.formbuilder.group({
      //resettoken: [this.resettoken],
      password:['',Validators.required],
      confirmPassword:['']
    })

  }

  get passwordForm(){
    return this.newPasswordForm.controls;
  }

  onSubmit(){
    
    const forgotData={
      password:this.passwordForm['password'].value,
      resettoken:this.resettoken,
      confirmPassword:this.passwordForm['confirmPassword'].value

    }
    this.isSubmitted=true;
    if (this.newPasswordForm.valid) {
 
      this.reset.newPassword(forgotData).subscribe(
        data => {
          this.newPasswordForm.reset();
          
          
        },
        
      );
    } else { this.isSubmitted = false; }

  }
}
