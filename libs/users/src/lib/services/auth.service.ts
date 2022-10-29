import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private token:LocalstorageService,private router:Router) { }
  login(email:string,password:string):Observable<User>{
    return this.http.post<User>('http://localhost:3000/api/v1/users/login',{email,password})
  }

  logout(){
    this.token.removeItem();
    this.router.navigate(['/login']);

  }
}
