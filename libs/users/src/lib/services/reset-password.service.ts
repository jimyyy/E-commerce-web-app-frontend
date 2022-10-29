import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient) { }


  requestReset(email:string): Observable<User> {
    return this.http.post('http://localhost:3000/api/v1/reset-password/req-reset-password',{email});
    
    
  }

  newPassword(forgotData:any): Observable<User> {
    return this.http.post(`http://localhost:3000/api/v1/reset-password/NewPassword`,forgotData);
  }

  ValidPasswordToken(resettoken:string): Observable<any> {
    return this.http.post(`http://localhost:3000/api/v1/reset-password/ValidPasswordToken`,resettoken);
  }
}
