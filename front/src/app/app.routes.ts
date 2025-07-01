

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostsComponent } from './pages/posts/posts.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { AccountComponent } from './pages/account/account.component';
import { CreateComponent } from './pages/create/create.component';
import { PostComponent } from './pages/post/post.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  {
    path: "",
    redirectTo: "welcome",
    pathMatch: "full",
  },
  {
    title: "Welcome",
    path: "welcome",
    component: WelcomeComponent,
    canActivate: [UnauthGuard],
  },
  { 
    title: "Login",
    path: "login",
    component: LoginComponent,
    canActivate: [UnauthGuard],
  },
  { 
    title: "Register",
    path: "register",
    component: RegisterComponent,
    canActivate: [UnauthGuard], 
  },
  { 
    title: "Posts",
    path: "posts",
    component: PostsComponent,
    canActivate: [AuthGuard],
  },
  { 
    title: "Topics",
    path: "topics",
    component: TopicsComponent,
    canActivate: [AuthGuard],
  },
  {
    title: "Account",
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    title:"Create Post",
    path: "create",
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    title:"Post",
    path:"post/:id",
    component: PostComponent,
    canActivate: [AuthGuard],
  },
  {
    title: "Not found",
    path:"404",
    component: NotFoundComponent,
  },
  {
    title:"Not found",
    path:"**",
    redirectTo:"404"
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }



/*
import { Routes } from '@angular/router';


import {  UserLayoutsComponent } from './layounts/user-layouts/user-layouts.component';
import { AdminLayoutComponent } from './layounts/admin-layout/admin-layout.component';
import { MainLayoutsComponent } from './layounts/main-layouts/main-layouts.component';

import { TopicsComponent } from './pages/topics/topics.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { UsersComponent } from './pages/admin/users/users.component';


export const routes: Routes = [
  {
    path: '',

    component: UserLayoutsComponent,
    canActivate: [authGuard],
    children: [
      
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
         component:ProfileComponent,
        canActivate: [authGuard],
        children: [


          {
            path: '',
            loadComponent: () =>
              import('./pages/user/profile/list/list.component')
            .then(m => m.ListComponent),
            canActivate: [authGuard]
          },

          {
            path: 'edit',
            loadComponent: () =>
              import('./pages/user/profile/editprofile/editprofile.component')
            .then(m => m.EditprofileComponent),
            canActivate: [authGuard]
          },

           {
            path: 'resetpassword',
            loadComponent: () =>
              import('./pages/user/profile/resetpassword/resetpassword.component')
            .then(m => m.ResetpasswordComponent),
            canActivate: [authGuard]
          },

        ]
      },
      
      {
        path: 'posts',
        loadComponent: () => 
          import('./pages/posts/lists/lists.component').then(m => m.ListsComponent),
        canActivate: [authGuard]
      },


      {
        path: 'posts',
        component:PostsComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/posts/lists/lists.component')
            .then(m => m.ListsComponent),
            canActivate: [authGuard]
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./pages/posts/new/new.component')
            .then(m => m.NewComponent),
            canActivate: [authGuard]
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./pages/posts/edit/edit.component')
            .then(m => m.EditComponent),
            canActivate: [authGuard]
          },
          {
            path: 'details/:id',
            loadComponent: () =>
              import('./pages/posts/details/details.component')
            .then(m => m.DetailsComponent),
            canActivate: [authGuard]
          },
          
        ]

      },




      {
        path: 'topics',
        component:TopicsComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/topics/lists/lists.component')
            .then(m => m.ListsComponent),
            canActivate: [authGuard]
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./pages/topics/new/new.component')
            .then(m => m.NewComponent),
            canActivate: [authGuard]
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./pages/topics/edit/edit.component')
            .then(m => m.EditComponent),
            canActivate: [authGuard]
          },
          {
            path: 'details/:id',
            loadComponent: () =>
              import('./pages/topics/details/details.component')
            .then(m => m.DetailsComponent),
            canActivate: [authGuard]
          },
          
        ]

      },

      {
        path: 'access-denied',
        loadComponent: () =>
          import('./pages/access-denied/access-denied.component').then(m => m.AccessDeniedComponent),
        canActivate: [authGuard]
      },

      {
        path: 'not-found',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
        canActivate: [authGuard]
      }
      
    ]
  },




  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
        canActivate: [authGuard, adminGuard]
      },
      {
        path: 'users',
        component:UsersComponent,
        canActivate: [authGuard, adminGuard],
        children: [

          {
        path: '',
        loadComponent: () =>
          import('./pages/admin/users/list/list.component')
        .then(m => m.ListComponent),
        canActivate: [authGuard, adminGuard]
      },

      {
        path: 'new',
        loadComponent: () =>
          import('./pages/admin/users/new/new.component')
        .then(m => m.NewComponent),
        canActivate: [authGuard, adminGuard]
      },

      {
        path: 'show/:id',
        loadComponent: () =>
          import('./pages/admin/users/show/show.component')
        .then(m => m.ShowComponent),
        canActivate: [authGuard, adminGuard]
      },

      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./pages/admin/users/edit/edit.component')
        .then(m => m.EditComponent),
        canActivate: [authGuard, adminGuard]
      },

        ]
      
      
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/admin/settings/settings.component')
        .then(m => m.SettingsComponent),
        canActivate: [authGuard, adminGuard]
      },
      {
        path: 'profile',
        loadComponent: () => 
          import('./pages/user/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard,adminGuard]
      },

      {
        path: 'access-denied',
        loadComponent: () =>
          import('./pages/access-denied/access-denied.component').then(m => m.AccessDeniedComponent),
        canActivate: [authGuard, adminGuard]
      },

      {
        path: 'not-found',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
        canActivate: [authGuard, adminGuard]
      }

      
    ]
  },



  {
    path: '',
    component: MainLayoutsComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./pages/contacts/contacts.component').then(m => m.ContactsComponent)
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'auth/login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'auth/register',
        loadComponent: () =>
          import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
      },

      {
        path: 'access-denied',
        loadComponent: () =>
          import('./pages/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
      },

      {
        path: 'not-found',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
      }
    ]
  },

 
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./pages/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
*/

