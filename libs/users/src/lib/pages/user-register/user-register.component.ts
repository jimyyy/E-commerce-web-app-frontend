import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'user-register',
  templateUrl: './user-register.component.html',
  styles: [],
})
export class UserRegisterComponent implements OnInit {
  userForm!:FormGroup;
  isSubmitted=false;
  currentUserId!:string;
  countries:any=[];
  constructor(private usersService:UsersService,
    private formbuilder:FormBuilder,
    private messageService:MessageService,
    private location : Location) {}

  ngOnInit(): void {
    this._initForm();
    this.getCountries();
  }

  private _initForm(){
    this.userForm=this.formbuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      country: ['',Validators.required],
      street: [''],
      apartment: [''],
      zip:[''],
      city:['']
    });

  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.userForm.invalid){
      return;
    }
    const user: User = {
      name: this.adduser['name'].value,
      email: this.adduser['email'].value,
      password: this.adduser['password'].value,
      id: this.currentUserId,
      phone:this.adduser['phone'].value,
      isAdmin:this.adduser['isAdmin'].value,
      street:this.adduser['street'].value,
      apartment:this.adduser['apartment'].value,
      zip:this.adduser['zip'].value,
      city:this.adduser['city'].value,
      country:this.adduser['country'].value,
    };
    this.addUser(user);

  }

  private addUser(user:User){
    this.usersService.createUser(user).subscribe(
      (user:User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User  ${user.name} is created`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created',
        });
      }
    );

  }

  get adduser() {
    return this.userForm.controls;
  }

  private getCountries(){
 
    this.countries = this.usersService.getCountries();
  }
}
