
package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.Models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

/**
 * CommentDTO class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    @NonNull
    private Long id;

    @NonNull
    private Long postId;

    @NonNull
    private User user;

    @NonNull
    private String content;

    @NonNull
    private LocalDateTime createdAt;

    @NonNull
    private LocalDateTime updatedAt;
}
