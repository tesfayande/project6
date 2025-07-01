package com.openclassrooms.mddapi.dto;


import com.openclassrooms.mddapi.Models.Topic;
import com.openclassrooms.mddapi.Models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

/**
 * PostDTO class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    @NonNull
    private Long id;

    @NonNull
    private Long topic_id;

    @NonNull
    private Topic topic;

    @NonNull
    private User author;

    @NonNull
    private String title;

    @NonNull
    private String content;

    @NonNull
    private LocalDateTime createdAt;

    @NonNull
    private LocalDateTime updatedAt;
}
