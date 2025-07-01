import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public router: Router) { }

  public ngOnInit(): void {
  }

  public navigateBack() : void {
    // will redirect to '/posts' if logged, else to '/welcome' due to routing configuration
    this.router.navigate(['/posts']);
  }

}
