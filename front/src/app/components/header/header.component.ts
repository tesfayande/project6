import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CookieTokenService } from '../../services/auth/CookieTokenService';

@Component({
  selector: 'app-header',
   imports: [
    CommonModule,
    MatSidenavModule,
   MatListModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {

  @Input() logged = 'false';

  public showBackArrow: boolean=true;
  public showNavMenu: boolean=true;

  public authenticationRoutes: string[] = ["/login", "/register"];
  public authenticatedRoutes: string[] = ["/posts", "/topics", "/account", "/create", "/post"];

  public routerSubscription!: Subscription;

  constructor(
    public location: Location,
    public router: Router,
    public sessionService: SessionService,
    public cookieTokenService: CookieTokenService
    ) {
      this.routerSubscription = this.router.events.subscribe((event:any) => {
        if(event instanceof NavigationEnd){
          if(this.authenticationRoutes.includes(router.url)){
            this.showBackArrow=true;
            this.showNavMenu=false;
            document.querySelector('.logo_div')?.setAttribute('showNavMenu', "false");
          }else if(this.authenticatedRoutes.includes(router.url)){
            this.showBackArrow=false;
            this.showNavMenu=true;
            this.setActive(router.url.substring(1));
          }else if(router.url.includes("/post")){
            document.getElementById("nav_posts")?.setAttribute('active', "false");
            document.getElementById("nav_posts_sidenav")?.setAttribute('active', "false");
          }
        }
      })
     }

  public ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();    
  }

  public navigateBack() : void {
    this.router.navigate(["/welcome"]);
  }



  public logout(): void {
    localStorage.removeItem("token");
     this.cookieTokenService.removeCookie('accessToken');
    this.sessionService.logOut();
    this.router.navigate(['']);
  }


  public click(element:string) : void {
    this.setActive(element);
    this.router.navigate([`/${element}`]);  
  }

  public setActive(element:string) : void {    
    document.getElementById("nav_topics")?.setAttribute('active', "false");
    document.getElementById("nav_posts")?.setAttribute('active', "false");
    document.querySelector('.account_circle')?.setAttribute('active', "false");
    document.getElementById("nav_topics_sidenav")?.setAttribute('active', "false");
    document.getElementById("nav_posts_sidenav")?.setAttribute('active', "false");
    document.getElementById("nav_account_sidenav_icon")?.setAttribute('active', "false");
    if(["topics","posts"].includes(element)){
      document.getElementById(`nav_${element}`)?.setAttribute('active', "true");
      document.getElementById(`nav_${element}_sidenav`)?.setAttribute('active', "true")
    }else if(element=="account"){
      document.querySelector('.account_circle')?.setAttribute('active', "true");
      document.getElementById(`nav_account_sidenav_icon`)?.setAttribute('active', "true");       
    }
  }

  public $isLogged(): Observable<boolean>{
    return this.sessionService.$isLogged();
  }

  public disableMain() : void {
    document.querySelector('.main-posts')?.setAttribute("click","none");
    document.querySelector('.main-account')?.setAttribute("click","none");
    document.querySelector('.main-post')?.setAttribute("click","none");
    document.querySelector('.main-create')?.setAttribute("click","none");
    document.querySelector('.main-topics')?.setAttribute("click","none")
  }

  
  enableMain() : void {
    document.querySelector('.main-posts')?.removeAttribute("click");
    document.querySelector('.main-account')?.removeAttribute("click");
    document.querySelector('.main-post')?.removeAttribute("click");
    document.querySelector('.main-create')?.removeAttribute("click");
    document.querySelector('.main-topics')?.removeAttribute("click");
  }
}