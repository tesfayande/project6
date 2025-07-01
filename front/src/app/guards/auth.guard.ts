import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../services/session/session.service";

@Injectable({providedIn:"root"})
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private sessionService: SessionService) { }

    public canActivate(): boolean{
        if(!this.sessionService.isLogged){
            this.router.navigate(['welcome']);
            return false;
        }
        return true;
    }
}