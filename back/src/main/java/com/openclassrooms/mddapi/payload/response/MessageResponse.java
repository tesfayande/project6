package com.openclassrooms.mddapi.payload.response;

import lombok.Getter;
import lombok.Setter;

/**
 * MessageResponse class response
 */
@Getter
@Setter
public class MessageResponse {
    private String message;

    public MessageResponse(String message){
        this.message = message;
    }

}
