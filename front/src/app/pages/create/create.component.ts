import { Component, EventEmitter, NgModule, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostRequest } from '../../interfaces/postRequest.interface';
import { Topic } from '../../interfaces/topic.interface';
import { PostsService } from '../../services/posts/posts.service';
import { TopicsService } from '../../services/topics/topics.service';
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
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})



export class CreateComponent implements OnInit, OnDestroy {

  public postForm : FormGroup ;

  @Output() formSubmit = new EventEmitter<any>();

  
  public onError : boolean = false;
  contentMessage?:string;
  maxContentLength = 500; // Set your maximum length
  currentLength = 0;

    public topics$: Topic[] = [];
  //public topics$: Topic[];
  public createSubscription!: Subscription;
  public loading : boolean = false;

  public topicsAllSubscription!: Subscription;
 
  

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public postsService: PostsService,
    public topicsService: TopicsService,
    private snackBar: MatSnackBar
    ) { 

      
      this.postForm = this.fb.group({
      topic_id: ['', Validators.required],
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250)
      ]]
    });


    }

  public ngOnInit(): void {
 this.getTopics()

 // Track content length changes
   /* this.postForm.get('content')?.valueChanges.subscribe(val => {
      this.currentLength = val?.length || 0;
    });*/
  }

  public ngOnDestroy(): void {
      this.createSubscription?.unsubscribe();
  }



   

  public getTopics(){
    this.topicsService.all().subscribe((topics) => {
      this.topics$=topics;
      console.log("Topics:",topics);
      
    })
  }

  public back(){
    this.router.navigate(['/posts'])
  }

  public submit() : void {
   
     const postRequest = this.postForm.value as PostRequest;

     this.loading=true;
    if (this.postForm.valid) {

       this.createSubscription = this.postsService.create(postRequest).subscribe((res: Post) => {
      this.loading=false;
      this.router.navigate([`/post/${res.id}`]);
    })
      //this.formSubmit.emit(this.postForm.value);
    } else {
      this.showValidationErrors();
    }
    }
     

  

    private showValidationErrors() {
    const form = this.postForm;
    for (const control in form.controls) {
      if (form.controls.hasOwnProperty(control)) {
        form.controls[control].markAsTouched();
      }
    }
    this.snackBar.open('Please fix the validation errors', 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  
  get title() {
    
    return this.postForm.get('title');
  }

  get content() { 
    return this.postForm.get('content'); 
  
  }
  get topicId() {
    return this.postForm.get('topic_id');
  }


}
