package com.openclassrooms.mddapi.Controllers;

import com.openclassrooms.mddapi.Models.Subscription;
import com.openclassrooms.mddapi.Models.Topic;
import com.openclassrooms.mddapi.Models.User;
import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.payload.response.SubscriptionResponse;
import com.openclassrooms.mddapi.service.SubscriptionService;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Class that handles "Subscription" controller
 */
@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {
    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserService userService;

    @Autowired
    private TopicService topicService;


    /**
     * Click on subscribe/unsubscribe button
     * @param id of the topic
     * @return ResponseEntity (OK or badRequest)
     */
    @PostMapping("/{id}")
    public ResponseEntity<?> clickButton(@PathVariable("id") String id){
        try{
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = this.userService.findByEmail(email);
            Topic topic = this.topicService.findTopicById(Long.valueOf(id));
            if(topic==null)
                return ResponseEntity.badRequest().build();
            Optional<Subscription> subscription = this.subscriptionService.findByUserAndTopic(user, topic);

            // If not subscribed
            if(subscription.isEmpty()){
                this.subscriptionService.subscribe(new Subscription(topic,user));
                return ResponseEntity.ok().body(new SubscriptionResponse("Subscribed !", topic));
            }
            // If already subscribed
            this.subscriptionService.unsubscribe(subscription.get().getId());
            return ResponseEntity.ok().body(new SubscriptionResponse("Unsubscribed !", topic));
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get user subscriptions
     * @return ResponseEntity (OK or badRequest)
     */
    @GetMapping("")
    public ResponseEntity<?> findSubscriptionsByUser(){
        try{
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = this.userService.findByEmail(email);
            Optional<List<Subscription>> subscriptions = this.subscriptionService.findByUser(user);

            // If no subscriptions
            if(subscriptions.isEmpty())
                return ResponseEntity.ok().build();

            // If subscriptions
            List<TopicDTO> list = new ArrayList<>();
            ModelMapper modelMapper = new ModelMapper();

            for(Subscription subscription: subscriptions.get()){
                list.add(modelMapper.map(subscription.getTopic(), TopicDTO.class));
            }
            return ResponseEntity.ok().body(list);
        }catch(NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
