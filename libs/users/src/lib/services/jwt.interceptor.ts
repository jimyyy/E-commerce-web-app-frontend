import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localstorageToken:LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.localstorageToken.getItem();
    const isAPIUrl=request.url.startsWith('http://localhost:3000/api/v1/');
    if(token && isAPIUrl){
      request=request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
