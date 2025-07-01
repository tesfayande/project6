package com.openclassrooms.mddapi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

/**
 * TopicDTO class
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicDTO {

    @NonNull
    private Long id;

    @NonNull
    private String description;

    @NonNull
    private String name;
}
