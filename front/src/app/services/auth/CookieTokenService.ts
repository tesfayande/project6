// token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieTokenService {
  

  
  private TOKEN_KEY = 'accessToken';
  constructor() {}
  // Store token securely
  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);


    const expires = new Date();
    expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // 1 day
    document.cookie = `${this.TOKEN_KEY}=${token};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;

   /* Cookie('accessToken', token, {
  httpOnly: true, // Prevent access from JavaScript
  secure: true,   // Ensure it's only sent over HTTPS
  sameSite: 'Strict', // Prevents the cookie from being sent with cross-site requests
});*/
  }
  // Retrieve token
  public getToken(): string | null {
    //return sessionStorage.getItem(this.TOKEN_KEY);




     const name = this.TOKEN_KEY;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for(let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  



  }
 


   // Remove a cookie
  removeCookie(name: string): void {


     const expires = new Date();
    expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // 1 day
    document.cookie = `${this.TOKEN_KEY}=;expires=${expires.toUTCString()};path=/;secure;samesite=strict`;

    //document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict`;
  }

  // Check if cookie exists
  hasCookie(name: string): boolean {
    return document.cookie.split(';').some(cookie => {
      return cookie.trim().startsWith(`${this.TOKEN_KEY}=`);
    });
  }


}


