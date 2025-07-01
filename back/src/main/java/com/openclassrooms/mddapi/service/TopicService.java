package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.Models.Topic;
import com.openclassrooms.mddapi.Models.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;



/**
 * Class that handles topics features
 */
@Service
public class TopicService {

	@Autowired
	private TopicRepository topicRepository;

	/**
	 * Gets all topics
	 * @return List<Topic>
	 */
	public List<Topic> findAllTopics() {
		return this.topicRepository.findAll();
	}










	/**
	 * Gets all topics By Author
	 * @return List<Topic>
	 */

	public Optional<List<Topic>> findByAuthor(User user){
		return this.topicRepository.findByAuthor(user);
	}



	/**
	 * Gets all Latest  topics
	 * @return List<Topic>
	 */

	public List<Topic> latestTopics(){
		return this.topicRepository.findAllByOrderByCreatedAtAsc();
	}



	/**
	 * Gets all Oldest  topics
	 * @return List<Topic>
	 */

	public List<Topic> oldestTopics(){
		return this.topicRepository.findAllByOrderByCreatedAtDesc();
	}





	/**
	 * Gets a topic by its id
	 * @param id id of the topic
	 * @return Topic
	 */
	public Topic findTopicById(Long id){
		return this.topicRepository.findById(id).orElse(null);
	}

	
}
