package com.openclassrooms.mddapi.payload.response;

import com.openclassrooms.mddapi.Models.Topic;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubscriptionResponse {

    private String message;
    private Topic topic;

    public SubscriptionResponse(String message, Topic topic){
        this.message=message;
        this.topic=topic;
    }

}
