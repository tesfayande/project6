// token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionTokenService {
  
  
  private TOKEN_KEY = 'accessToken';
  constructor() {}
  // Store token securely

  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);

  }


  // Retrieve token
  public getToken(): string | null {
    
    return sessionStorage.getItem(this.TOKEN_KEY);

  }
  
  // Remove a cookie
  removeCookie(): void {
    sessionStorage.clear();
  }
  
  // Check if cookie exists
  hasCookie(name: string): boolean {
    
    return document.cookie.split(';').some(cookie => {
      return cookie.trim().startsWith(`${this.TOKEN_KEY}=`);
    });
  }


}


