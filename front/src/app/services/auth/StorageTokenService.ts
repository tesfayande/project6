// token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageTokenService {
  
  private TOKEN_KEY = 'accessToken';
  constructor() {}
  // Store token securely
  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);


  
  }
  // Retrieve token
  public getToken() {
    return sessionStorage.getItem(this.TOKEN_KEY);



  }
 


   // Remove a cookie
  removeCookie(name: string): void {

 }

  // Check if cookie exists
  hasCookie(name: string){
    //return sessionStorage.getItem(this.TOKEN_KEY)? null;
  }


}


