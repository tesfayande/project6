import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from '../../interfaces/comment.interface';
import { Post } from '../../interfaces/post.interface';
import { CommentsService } from '../../services/comments/comments.service';
import { PostsService } from '../../services/posts/posts.service';
import { TopicsService } from '../../services/topics/topics.service';
import { UserService } from '../../services/user/user.service';
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

@Component({
  selector: 'app-post',
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
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  public postId: string;
  public post: Post | undefined;
  public comments!: Comment[];
  
  public date!: Date;
   form: FormGroup;

  

  public postDetailSubscription!: Subscription;
  public postAllSubscription!: Subscription;
  public postCreateSubscription!: Subscription;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public postsService: PostsService,
    public commentsService: CommentsService,
    public fb: FormBuilder,
    public topicsService: TopicsService,
    public userService: UserService
    ) { 
      this.postId = this.route.snapshot.paramMap.get('id')!;

      this.form = this.fb.group({
    content: [
      '',
      [Validators.required]
    ]
  })
     }

  public ngOnInit(): void {
    this.loadPost();
    this.loadComments(this.postId);
  }

  public ngOnDestroy(): void {
      this.postAllSubscription.unsubscribe();
      this.postCreateSubscription?.unsubscribe();
      this.postDetailSubscription.unsubscribe();
  }

  public back(): void {
    this.router.navigate(['/posts']);
  }

  public loadPost() : void {
    this.postDetailSubscription = this.postsService.detail(this.postId).subscribe({
        next: (post: Post) => {
          this.post = {
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.createdAt),
          };
        },
        error: () => {
          this.router.navigate(['**']);
        },
      })
  }

  public loadComments(id: string) : void {
    this.postAllSubscription = this.commentsService.all(id).subscribe((comments: Comment[]) => {
      this.comments=comments.sort((a,b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      });
    })
  }

  public sendComment() : void {
    let commentRequest = this.form.value as Comment;
    commentRequest.postId=parseInt(this.postId);
    this.postCreateSubscription = this.commentsService.create(commentRequest).subscribe((comment: Comment) => {
      this.comments= [...this.comments, comment]
    });
    this.form.reset();
  }
}
