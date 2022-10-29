import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@e-commerce/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit,OnDestroy {
  users: User[] = [];
  countryKey!:string;
  endsubs$:Subject<any> = new Subject();
  constructor(
    private userService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    
  }

  ngOnDestroy(): void {
      this.endsubs$.complete();
  }
  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want delete this user?',
      header: 'Delete user',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe(
          () => {
            this.getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted',
            });
          }
        );
      },
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  private getUsers() {
    this.userService.getusers().pipe(takeUntil(this.endsubs$)).subscribe((users) => {
      this.users = users;
    });
  }

  // getCountryName(countryKey: string) {
  //   if (countryKey) 
  //     return this.userService.getCountry(countryKey);
    
  // }
}
