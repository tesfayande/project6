package com.openclassrooms.mddapi.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;



/**
 * Subscription entity
 */
@Data
@Entity
@Table(name = "subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @NonNull
    @OneToOne
    @JoinColumn(name="topic_id")
    private Topic topic;

    public Subscription(Topic topic, User user){
        this.topic = topic;
        this.user = user;
    }

    public Subscription(){ }

}
