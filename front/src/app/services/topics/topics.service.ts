import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private pathService = "api/topic";

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<Topic[]>{
    return this.httpClient.get<Topic[]>(this.pathService);
  }





    getTopics(filter: string): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.pathService}/${filter}`);
  }

  public detail(id:string): Observable<Topic>{
    return this.httpClient.get<Topic>(`${this.pathService}/${id}`);
  }

}
