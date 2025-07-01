package com.openclassrooms.mddapi.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

/**
 * UserDTO class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    @NonNull
    private Long id;

    @NonNull
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    @NonNull
    @Size(min=3)
    private String name;

    @NonNull
    @Size(min=8)
    private String password;

    @NonNull
    private LocalDateTime createdAt;

    @NonNull
    private LocalDateTime updatedAt;
}
