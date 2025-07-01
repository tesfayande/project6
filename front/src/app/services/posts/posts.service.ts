import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { Observable } from 'rxjs';
import { PostRequest } from '../../interfaces/postRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private pathService = "api/post";

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.pathService);
  }


  loadPosts(filter: string): Observable<Post[]> {
      return this.httpClient.get<Post[]>(`${this.pathService}/${filter}`);
    }

  public detail(id:string): Observable<Post>{
    return this.httpClient.get<Post>(`${this.pathService}/${id}`);
  }

  public create(post: PostRequest): Observable<Post>{
    return this.httpClient.post<Post>(this.pathService, post)
  }
}
