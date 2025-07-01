import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../../interfaces/subscription.interface';
import { Topic } from '../../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private pathService = "api/subscription"

  constructor(private httpClient: HttpClient) { }

  // click on subscribe/unsubscribe button
  public click(id: number): Observable<Subscription> {
    return this.httpClient.post<Subscription>(`${this.pathService}/${id}`, id);
  }

  public all(): Observable<Topic[]>{
    return this.httpClient.get<Topic[]>(`${this.pathService}`)
  }
}
