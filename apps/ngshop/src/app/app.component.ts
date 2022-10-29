import { Component, OnInit } from '@angular/core';
import { UsersService } from '@e-commerce/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ngshop';
  constructor(private usersService:UsersService){

  }

  ngOnInit(): void {
      this.usersService.initAppSession();
  }
  
}
