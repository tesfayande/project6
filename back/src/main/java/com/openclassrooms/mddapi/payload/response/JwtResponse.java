package com.openclassrooms.mddapi.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * JwtResponse class response
 */
@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String name;
    //private String role;
    private String email;
    private Date tokeExpiration;

    public JwtResponse(String token,Date tokeExpiration, Long id, String name, String email){
        this.token = token;
        this.tokeExpiration=tokeExpiration;
        this.id = id;
        this.name = name;
        //this.role =role;
        this.email = email;

    }

}
