export interface Topic{
    id:number,
    name:string,
    description:string,
    isSubscribed?:boolean,
    createdAt?: Date,
    updatedAt?: Date,
}




export interface TopicFilter {
  type: 'latest' | 'oldest' | 'owned' | 'all';
  page?: number;
  limit?: number;
}