import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PASSWORD_PATTERN } from '../../constants/password.validator';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { AuthService } from '../../services/auth/auth.service';
import { ResponsiveService } from '../../services/responsive/responsive.service';
import { SessionService } from '../../services/session/session.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { CookieTokenService } from '../../services/auth/CookieTokenService';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule, 
  FormsModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public onError : boolean = false;
  public onErrorEmail: boolean = false;

  form: FormGroup;

  

  public hide : boolean = true;
  public loading : boolean = false;
  public registerSubscription!: Subscription

  constructor(
    public responsiveService: ResponsiveService,
    public fb: FormBuilder,
    public authService: AuthService,
    public cookieTokenService: CookieTokenService,
    public sessionService: SessionService,
    public router: Router,
    ) {


       this.form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ],
    ],
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern(PASSWORD_PATTERN),
      ]
    ]
  })


     }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
      this.registerSubscription?.unsubscribe();
  }

  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.loading=true;
    this.registerSubscription = this.authService.register(registerRequest).subscribe({
      next: (response: SessionInformation) => {
        this.loading=false;
        
        localStorage.setItem("token", response.token);
         this.cookieTokenService.setToken(response.token);

        this.sessionService.logIn(response);
        this.router.navigate(['/posts']);
      },
      error: (e) => {
        this.loading=false
        if(e.error.message==="Error: Email is already taken!"){
          this.onErrorEmail=true;
        }else{
          this.onError = true;
          this.onErrorEmail=false;
        }
      }, 
    })
  }

}
