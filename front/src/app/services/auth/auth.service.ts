import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID,Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { TokenResponse } from '../../interfaces/tokenResponse.interface';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { CookieTokenService } from './CookieTokenService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = "api/auth";

    constructor(private httpClient: HttpClient,public cookieTokenService: CookieTokenService) { }



   

   // Set cookie
  setToken(token: string): void {

    this.cookieTokenService.setToken(token);
     }

  // Get cookie
  getToken(){
   this.cookieTokenService.getToken();
  }



   // Remove token
  removeToken(): void {
    this.cookieTokenService.removeCookie('accessToken');
  }


    public register(registerRequest: RegisterRequest): Observable<SessionInformation>{
        return this.httpClient.post<SessionInformation>(`${this.pathService}/register`, registerRequest);
    }

    public login(loginRequest: LoginRequest): Observable<SessionInformation> {
        return this.httpClient.post<SessionInformation>(`${this.pathService}/login`, loginRequest);
    }
}
