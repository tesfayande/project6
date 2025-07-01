package com.openclassrooms.mddapi.repository;


import com.openclassrooms.mddapi.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * TopicRepository interface
 */
@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    // Find topics created by a specific user
    Optional<List<Topic>> findByAuthor(User author);



    // Find all topics ordered by creation date (newest first)
    List<Topic> findAllByOrderByCreatedAtDesc();

    // Find all topics ordered by creation date (oldest first)
    List<Topic> findAllByOrderByCreatedAtAsc();





}
