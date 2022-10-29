import { Injectable } from '@angular/core';
const TOKEN = 'jwtToken'
@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setItem(data: any) {
    localStorage.setItem(TOKEN, data);
  }
  getItem() {
    return localStorage.getItem(TOKEN);
  }

  removeItem() {
    localStorage.removeItem(TOKEN);
  }

  isValidToken(){
    const token = this.getItem();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp)


    }else{
      return false
    }
  }


  getUserIdFromToken(){
    const token = this.getItem();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode){
        return tokenDecode.userId;

      }else{
        return null

      }
   


    }else{
      return null
    }

  }

  private  _tokenExpired(expiration:any):boolean{
    return Math.floor(new Date().getTime() / 1000) >=expiration;
   
  }


}
