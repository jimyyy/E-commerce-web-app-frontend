import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact, UsersService } from '@e-commerce/users';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'ngshop-contact',
  templateUrl: './contact.component.html',
  styles: [],
})
export class ContactComponent implements OnInit {
  contactForm!:FormGroup;
  isSubmitted=false;
  location: any;
  constructor(private formBuilder:FormBuilder,private usersService:UsersService, private messageService:MessageService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.contactForm.invalid){
      return;
    }

    const contact: Contact = {
      name: this.contactsForm['name'].value,
      email: this.contactsForm['email'].value,
     
      
      subject:this.contactsForm['subject'].value,
      message:this.contactsForm['message'].value,
   
    };

    this.usersService.createContact(contact).subscribe(
      (contact:Contact) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `The message is send to administrateur`,
        });
        
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Message is not send',
        });
      }
    );



  }

  private initForm(){
    this.contactForm=this.formBuilder.group({
      name: ['', Validators.required],
      
      email: ['', [Validators.required,Validators.email]],
      subject: ['', Validators.required],
      
      message: ['',Validators.required],
      
    });
  }

  
  get contactsForm() {
    return this.contactForm.controls;
  }
}
