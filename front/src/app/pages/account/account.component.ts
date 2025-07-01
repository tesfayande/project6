import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { SessionService } from '../../services/session/session.service';
import { UserService } from '../../services/user/user.service';
import { AccountRequest } from '../../interfaces/accountRequest.interface';
import { PASSWORD_PATTERN } from '../../constants/password.validator';
import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';
import { Topic } from '../../interfaces/topic.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
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
import { CommonModule } from '@angular/common';
import { CookieTokenService } from '../../services/auth/CookieTokenService';

@Component({
  selector: 'app-account',
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
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  public user: User | undefined;
  public accountForm!: FormGroup;
  public onError: boolean = false;
  public onErrorEmail: boolean = false;
  public hide : boolean = true;
  public subscriptions: Topic[] | undefined;
  public id: string | undefined;
  public loading : boolean = false;
  public userDetailSubscription!: Subscription;
  public userUpdateSubscription!: Subscription;
  public userAllSubscription!: Subscription;
  public userClickSubscription!: Subscription;

  constructor(
    public router: Router,
    public sessionService: SessionService,
    public subscriptionsService: SubscriptionsService,
    public userService: UserService,
    public fb: FormBuilder,
    public matSnackBar: MatSnackBar,
    public route: ActivatedRoute,
    public cookieTokenService: CookieTokenService
    ) {
     }
  

  public ngOnInit(): void {
    this.userDetailSubscription = this.userService.detail().subscribe((user: User) => {
      this.user = user;
      this.id = this.user.id?.toString();
      this.initForm(user);
    });
    this.getSubscriptions()
  }

  public ngOnDestroy(): void {
    this.userAllSubscription.unsubscribe();
    this.userClickSubscription?.unsubscribe();
    this.userDetailSubscription.unsubscribe();
    this.userUpdateSubscription?.unsubscribe();
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.sessionService.logOut();
    this.cookieTokenService.removeCookie('accessToken');
    this.router.navigate(['']);
  }

  public submit(): void {
    const accountRequest = this.accountForm.value as AccountRequest;
    this.loading=true;
    this.userUpdateSubscription = this.userService.update(this.id!,accountRequest).subscribe({
      next: (_:User) => {
        this.loading=false;
        this.matSnackBar.open('Account updated!', 'Close', {duration: 5000});
        this.onError=false;
        this.onErrorEmail=false;
      },
      error: (e) => {
        this.loading=false
        if(e.error.message==="Error: Email is already taken!"){
          this.onErrorEmail=true;
        }else{
          this.onError=true;
          this.onErrorEmail=false;
        }
      },
    })
  }

  public getSubscriptions() : void {
    this.userAllSubscription = this.subscriptionsService.all().subscribe((subscriptions) => {
      this.subscriptions = subscriptions.map((subscription: Topic) => {
        subscription.isSubscribed=true;
        return subscription
      });
    })
  }

  public click(id: number) : void {
    this.userClickSubscription = this.subscriptionsService.click(id).subscribe((res) => {
      let subscription = this.subscriptions?.find((s) =>  s.id === id);
      if(res.message === "Subscribed !" && subscription){
        subscription.isSubscribed=true;
      }else if(res.message === "Unsubscribed !" && subscription){
        subscription.isSubscribed=false;
      }
    });
  }

  private initForm(user: User) : void {
    this.accountForm = this.fb.group({
      email: [
        user ? user.email : '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      name: [
        user ? user.name : '',
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PASSWORD_PATTERN),
        ]
      ],
    })
  }
   
}
