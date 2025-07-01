package com.openclassrooms.mddapi.repository;


import com.openclassrooms.mddapi.Models.Subscription;
import com.openclassrooms.mddapi.Models.Topic;
import com.openclassrooms.mddapi.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * SubscriptionRepository interface
 */
@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Optional<List<Subscription>> findByUser(User user);

    Optional<List<Subscription>> findByTopic(Topic topic);

    Optional<Subscription> findByUserAndTopic(User user, Topic topic);
}
