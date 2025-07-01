package com.openclassrooms.mddapi.Controllers;

import com.openclassrooms.mddapi.Models.Subscription;
import com.openclassrooms.mddapi.Models.Topic;
import com.openclassrooms.mddapi.Models.User;
import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.service.SubscriptionService;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Class that handles "Topic" controller
 */
@RestController
@RequestMapping("/api/topic")
public class TopicController {


	@Autowired
	private UserService userService;


	@Autowired
	private TopicService topicService;



	@Autowired
	private SubscriptionService subscriptionService;

	/**
	 * Get all topics
	 * @return ResponseEntity (OK or badRequest)
	 */
	@GetMapping()
	public ResponseEntity<?> findAll() {
		try{
			List<Topic> topics = this.topicService.findAllTopics();
			if(topics.isEmpty())
				return ResponseEntity.ok().build();
			List<TopicDTO> list = new ArrayList<>();
			ModelMapper modelMapper = new ModelMapper();
			for(Topic topic: topics){
				list.add(modelMapper.map(topic, TopicDTO.class));
			}
			return ResponseEntity.ok().body(list);
		}catch(NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}

	/**
	 * Get a topic by its id
	 * @param id id of the topic
	 * @return ResponseEntity (OK or badRequest)
	 */
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") String id){
		try{
			Topic topic = this.topicService.findTopicById(Long.valueOf(id));
			if(topic==null)
				return ResponseEntity.notFound().build();
			ModelMapper modelMapper = new ModelMapper();
			return ResponseEntity.ok().body(modelMapper.map(topic, TopicDTO.class));
		}catch (NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}





	/**
	 * Get all topics
	 * @return ResponseEntity (OK or badRequest)
	 */
	@GetMapping("/all")

	public ResponseEntity<?> findAllTopics() {
		try{
			List<Topic> topics = this.topicService.findAllTopics();
			if(topics.isEmpty())
				return ResponseEntity.ok().build();
			List<TopicDTO> list = new ArrayList<>();
			ModelMapper modelMapper = new ModelMapper();
			for(Topic topic: topics){
				list.add(modelMapper.map(topic, TopicDTO.class));
			}
			return ResponseEntity.ok().body(list);
		}catch(NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}


	@GetMapping("/owned")

	public ResponseEntity<?> owned() {
		try{


			String email = SecurityContextHolder.getContext().getAuthentication().getName();
			User user = this.userService.findByEmail(email);
			//Optional<List<Subscription>> subscriptions = this.subscriptionService.findByUser(user);

			Optional<List<Topic>> topics = this.topicService.findByAuthor(user);
			if(topics.isEmpty())
				return ResponseEntity.ok().build();
			//List<TopicDTO> list = new ArrayList<>();
			//ModelMapper modelMapper = new ModelMapper();

			//list.add(modelMapper.map(topic, TopicDTO.class));
			return ResponseEntity.ok().body(topics);
		}catch(NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}




	@GetMapping("/subscribed")

	public ResponseEntity<?> subscribed() {
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






	@GetMapping("/latest")

	public ResponseEntity<?> latest() {


		try{



			List<Topic> topics = this.topicService.latestTopics();
			if(topics.isEmpty())
				return ResponseEntity.ok().build();
			//List<TopicDTO> list = new ArrayList<>();
			//ModelMapper modelMapper = new ModelMapper();

			//list.add(modelMapper.map(topic, TopicDTO.class));
			return ResponseEntity.ok().body(topics);
		}catch(NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}



	@GetMapping("/oldest")

	public ResponseEntity<?>oldest() {


		try{



			List<Topic> topics = this.topicService.oldestTopics();
			if(topics.isEmpty())
				return ResponseEntity.ok().build();
			//List<TopicDTO> list = new ArrayList<>();
			//ModelMapper modelMapper = new ModelMapper();

			//list.add(modelMapper.map(topic, TopicDTO.class));
			return ResponseEntity.ok().body(topics);
		}catch(NumberFormatException e){
			return ResponseEntity.badRequest().build();
		}
	}






}
