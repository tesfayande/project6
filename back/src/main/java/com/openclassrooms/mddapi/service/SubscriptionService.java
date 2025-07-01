package com.openclassrooms.mddapi.service;




import com.openclassrooms.mddapi.Models.Subscription;
import com.openclassrooms.mddapi.Models.Topic;
import com.openclassrooms.mddapi.Models.User;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Class that handles subscriptions features
 */
@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public Subscription subscribe(Subscription subscription){
        return this.subscriptionRepository.save(subscription);
    }

    public void unsubscribe(Long id){
        this.subscriptionRepository.deleteById(id);
    }

    /**
     * Finds a subscription by user and topic
     * @param user
     * @param topic
     * @return Optional<Subscription>
     */
    public Optional<Subscription> findByUserAndTopic(User user, Topic topic){ return this.subscriptionRepository.findByUserAndTopic(user,topic); }

    /**
     * Gets all user subscriptions
     * @param user
     * @return Optional<List<Subscription>>
     */
    public Optional<List<Subscription>> findByUser(User user){
        return this.subscriptionRepository.findByUser(user);
    }

}
