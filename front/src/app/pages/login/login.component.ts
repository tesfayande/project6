import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { AuthService } from '../../services/auth/auth.service';
import { SessionService } from '../../services/session/session.service';
import { PASSWORD_PATTERN } from '../../constants/password.validator';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { CookieTokenService } from '../../services/auth/CookieTokenService';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public hide : boolean = true;
  public onError : boolean = false;

  public form : FormGroup;

  public loading : boolean= false;
  public loginSubscription!: Subscription

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    public cookieTokenService: CookieTokenService,
    public sessionService: SessionService,
    ) { 


      this.form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern(PASSWORD_PATTERN)
      ]
    ]
  });



    }

  public ngOnInit(): void {
    
  }

  public ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();    
  }

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.loading=true;
    this.loginSubscription = this.authService.login(loginRequest).subscribe({
      next: (response: SessionInformation) => {
        this.loading=false;
        localStorage.setItem("token", response.token);
         this.cookieTokenService.setToken(response.token);

        this.sessionService.logIn(response);
        this.router.navigate(["/posts"]);
      },
      error: () => {
        this.onError = true;
        this.loading=false;
      },
    })
  }

}
