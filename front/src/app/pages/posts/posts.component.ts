import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post,PostFilter} from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts/posts.service';
import { ResponsiveService } from '../../services/responsive/responsive.service';
import { UserService } from '../../services/user/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { AuthService } from '../../services/auth/auth.service';
import { CookieTokenService } from '../../services/auth/CookieTokenService';

@Component({
  selector: 'app-posts',
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
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

    auth_token! :any;
  public posts!: Post[];
  public postsAllSubscription!: Subscription;

   filter: PostFilter = { type: 'latest' };
       //filterOptions: SelectItem[] = [];
       filterOptions: { label: string; value: string; }[] | undefined;

        selectedFilter: string = 'all';

  constructor(
    public responsiveService: ResponsiveService,
    public router: Router,
    public postsService: PostsService,
    public userService: UserService,
    public authService: AuthService,
    public cookieTokenService: CookieTokenService,
    ) { 

      this.initializeFilterOptions()
    }

   public ngOnInit(): void {
    this.getPosts();
    this.loadAuthToken();
    //this.loadPosts()
  }

  public ngOnDestroy(): void {
      this.postsAllSubscription.unsubscribe();
  }

  public navigate() : void {
    this.router.navigate(['/create']);
  }

  public navigateToPost(id:number) : void {
    this.router.navigate([`/post/${id}`]);
  }

    initializeFilterOptions(): void {
    this.filterOptions = [
      //{ label: 'Latest', value: 'latest' },
      //{ label: 'Oldest', value: 'oldest' },
      { label: 'All Posts', value: 'all' },
      { label: 'My Posts', value: 'owned' }
    ];

  }




  loadPosts(): void {
   // this.loading = true;
    let filter = this.selectedFilter;
    
    


    this.postsAllSubscription = this.postsService.loadPosts(filter).subscribe((posts: Post[]) => {
      this.posts=posts.map((post: Post) => {
        return {
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        };
      }).sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    })
   
  }


  public getPosts() : void {
    this.postsAllSubscription = this.postsService.all().subscribe((posts: Post[]) => {
      this.posts=posts.map((post: Post) => {
        return {
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        };
      }).sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    })
  }



   onFilterChange(): void {
    console.log('Selected value:', this.selectedFilter);
    this.loadPosts();
  }


   public loadAuthToken(): void {
    this.auth_token=this.cookieTokenService.getToken();
  }

}
