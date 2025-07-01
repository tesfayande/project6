package com.openclassrooms.mddapi.repository;


import com.openclassrooms.mddapi.Models.Post;
import com.openclassrooms.mddapi.Models.Topic;
import com.openclassrooms.mddapi.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * PostRepository interface
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long>{

    // Find all topics by topic
    Optional<List<Post>> findByTopic(Topic topic);


    // Find all topics by Author
    Optional<List<Post>> findByAuthor(User author);


    // Find all topics ordered by creation date (newest first)
    List<Post> findAllByOrderByCreatedAtDesc();

    // Find all topics ordered by creation date (oldest first)
    List<Post> findAllByOrderByCreatedAtAsc();

}
