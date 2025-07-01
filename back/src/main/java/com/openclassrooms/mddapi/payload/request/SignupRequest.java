package com.openclassrooms.mddapi.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;


/**
 * SignupRequest class
 */
@Data
public class SignupRequest {

    @NonNull
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    @NonNull
    @Size(min=3)
    private String name;


    @Nullable
    @Size(min=3)
    private String role;

    @NonNull
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+!*?=-])(?=\\S+$).{8,}$")
    @Size(min = 8, max = 40)
    private String password;

}
