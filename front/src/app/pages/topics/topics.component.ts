import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Topic,TopicFilter } from '../../interfaces/topic.interface';
import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';
import { TopicsService } from '../../services/topics/topics.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-topics',
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
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit, OnDestroy {

  public topics: Topic[] | undefined;
  public subscriptions: number[] | undefined;
  public isSubscribed: boolean | undefined;
  public topicsAllSubscription!: Subscription;
  public subscriptionsAllSubscription!: Subscription;
  public subscriptionsClickSubscription!: Subscription;



   filter: TopicFilter = { type: 'latest' };
         //filterOptions: SelectItem[] = [];
         filterOptions: { label: string; value: string; }[] | undefined;
  
          selectedFilter: string = 'all';



  constructor(
    public topicsService: TopicsService,
    public subscriptionsService: SubscriptionsService
    ) { 


      this.initializeFilterOptions();

     }

  public ngOnInit(): void {
    this.getSubscribedTopics();
    this.getTopics();    
  }



    initializeFilterOptions(): void {
    this.filterOptions = [
     
      { label: 'Latest', value: 'latest' },
      { label: 'Oldest', value: 'oldest' },
      { label: 'All Topics', value: 'all' },
      { label: 'My Topics', value: 'owned' },
      { label: 'Subscribed', value: 'subscribed' }
    ];

  }






   onFilterChange(): void {
    console.log('Selected value:', this.selectedFilter);
    this.loadTopics();
  }






  public ngOnDestroy(): void {
    this.topicsAllSubscription.unsubscribe();
    this.subscriptionsAllSubscription.unsubscribe();
    this.subscriptionsClickSubscription?.unsubscribe();
  }






   loadTopics(): void {
     // this.loading = true;
      let filter = this.selectedFilter;
      
      this.topicsAllSubscription = this.topicsService.getTopics(filter).subscribe((topics) => {
      this.topics=topics;
    })
     
    }




  public getTopics(){
    this.topicsAllSubscription = this.topicsService.all().subscribe((topics) => {
      this.topics=topics;
    })
  }

  public getSubscribedTopics() {
    this.subscriptionsAllSubscription = this.subscriptionsService.all().subscribe((subscriptions: Topic[]) => {
      this.subscriptions=subscriptions.map((s) => {
        return s.id
      });
    })
  }

  public click(id:number) : void {
    this.subscriptionsClickSubscription = this.subscriptionsService.click(id).subscribe((res) => {
      if(res.message === "Subscribed !" && this.subscriptions){
        let subscriptions = this.subscriptions;
        this.subscriptions= [...subscriptions, id];
      }else if(res.message === "Unsubscribed !" && this.subscriptions){
        this.subscriptions = this.subscriptions.filter((subscription_id) => subscription_id!=id);
      }
    })
  }

}
