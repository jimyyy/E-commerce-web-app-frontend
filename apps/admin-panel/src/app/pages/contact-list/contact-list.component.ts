import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact, UsersService } from '@e-commerce/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-contact-list',
  templateUrl: './contact-list.component.html',
  styles: [],
})
export class ContactListComponent implements OnInit,OnDestroy {
  contacts: Contact[] = [];
  endsubs$:Subject<any> = new Subject();
  constructor( private userService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,) {}

  ngOnInit(): void {
    this.getContacts();
  }
  ngOnDestroy(): void {
      this.endsubs$.complete();
  }

  private getContacts(){
    this.userService.getContacts().pipe(takeUntil(this.endsubs$)).subscribe((contacts) => {
      this.contacts = contacts;
    });

  }

  deleteUser(contactId:string){
    this.confirmationService.confirm({
      message: 'Do you want delete this contact?',
      header: 'Delete user',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteContact(contactId).subscribe(
          () => {
            this.getContacts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Contact is deleted',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Contact is not deleted',
            });
          }
        );
      },
    });

  }
}
