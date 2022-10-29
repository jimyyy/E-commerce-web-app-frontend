import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class NgshopAuthGuard implements CanActivate {

  constructor( private router: Router,
    private localstorageToken: LocalstorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const token = this.localstorageToken.getItem();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      if (tokenDecode.isAdmin==false && !this._tokenExpired(tokenDecode.exp)) return true;
    }

    this.router.navigate(['/login']);
    return false;

    }

    private  _tokenExpired(expiration:any):boolean{
      return Math.floor(new Date().getTime() / 1000) >=expiration;
     }
}
