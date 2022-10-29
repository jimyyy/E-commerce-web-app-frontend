import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@e-commerce/users';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';




@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent implements OnInit {
  editmode=false;
  addusers!:FormGroup;
  isSubmitted=false;
  currentUserId!:string;
  countries:any=[];
  constructor(private formbuilder:FormBuilder,
    private messageService:MessageService,
    private usersService:UsersService,
    private route:ActivatedRoute,
    private location : Location) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    this.getCountries();
  }
  onSubmit(){
    this.isSubmitted=true;
    if(this.addusers.invalid){
      return;
    }
    const user: User = {
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      password: this.userForm['password'].value,
      id: this.currentUserId,
      phone:this.userForm['phone'].value,
      isAdmin:this.userForm['isAdmin'].value,
      street:this.userForm['street'].value,
      apartment:this.userForm['apartment'].value,
      zip:this.userForm['zip'].value,
      city:this.userForm['city'].value,
      country:this.userForm['country'].value,
    };

    if (this.editmode) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }

  }

  private checkEditMode(){
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentUserId = params['id'];
        this.usersService
          .getUser(params['id'])
          .subscribe((user) => {
            this.userForm['name'].setValue(user.name);
            this.userForm['email'].setValue(user.email);
            this.userForm['isAdmin'].setValue(user.isAdmin);
            this.userForm['street'].setValue(user.street);
            this.userForm['apartment'].setValue(user.apartment);
            this.userForm['zip'].setValue(user.zip);
            this.userForm['city'].setValue(user.city);
            this.userForm['country'].setValue(user.country);
            this.userForm['phone'].setValue(user.phone);
            this.userForm['password'].setValidators([]);
            this.userForm['password'].updateValueAndValidity();

          });
      }
    });

  }

  private updateUser(user:User){
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated',
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated',
        });
      }
    );

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

  get userForm() {
    return this.addusers.controls;
  }

  private initForm(){
    this.addusers=this.formbuilder.group({
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

  private getCountries(){
 
    this.countries = this.usersService.getCountries();
  }
}
