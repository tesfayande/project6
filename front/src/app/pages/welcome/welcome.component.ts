import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public header! : HeaderComponent
  



  constructor(public router: Router,) { }

  public ngOnInit(): void { }

  public navigate(path:string): void {
    this.router.navigate([`/${path}`]);
  }


 

}
