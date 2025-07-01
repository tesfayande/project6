import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SessionService } from './services/session/session.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  
  public showHeader: boolean = true;
  public logged:string = "false";

  constructor(private router: Router, private sessionService: SessionService){
    this.router.events.subscribe((event:any) => {
      if(event instanceof NavigationEnd){
        if(["/welcome","/404"].includes(router.url)){
          this.showHeader=false;
        }else{
          this.showHeader=true;
        }
      }
    })
    this.sessionService.$isLogged().subscribe((data) => {
      if(data){
        this.logged = "true"
      }else{
        this.logged = "false";
        sessionService.sessionInformation=undefined
      }
    })
  }


}
