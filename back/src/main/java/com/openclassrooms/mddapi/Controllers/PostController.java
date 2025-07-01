package com.openclassrooms.mddapi.Controllers;

import com.openclassrooms.mddapi.Models.Post;
import com.openclassrooms.mddapi.Models.Topic;
import com.openclassrooms.mddapi.Models.User;
import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.SubscriptionService;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * Class that handles "Post" controller
 */
@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private TopicService topicService;


    /**
     * Get all posts
     * @return ResponseEntity (OK)
     */
    @GetMapping()
    public ResponseEntity<?> findAll(){
        List<Post> posts = this.postService.findAllPosts();

        if(posts.isEmpty())
            return ResponseEntity.ok().body(new ArrayList<>());

        ModelMapper modelMapper = new ModelMapper();
        List<PostDTO> postsList = Arrays.asList(modelMapper.map(posts, PostDTO[].class));

        return ResponseEntity.ok().body(postsList);
    }

    /**
     * Find a post by its id
     * @param id id of the post
     * @return ResponseEntity (OK or notFound or badRequest)
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String id){
        try {
            Post post = this.postService.findPostById(Long.valueOf(id));
            if(post==null)
                return ResponseEntity.notFound().build();
            ModelMapper modelMapper = new ModelMapper();
            return ResponseEntity.ok().body(modelMapper.map(post, PostDTO.class));
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Create a post
     * @param postDTO Object that contains post request
     * @return ResponseEntity (OK)
     */
    @PostMapping()
    public ResponseEntity<?> createPost(@RequestBody PostDTO postDTO){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = this.userService.findByEmail(email);
        User userResponse = new User(user.getId(), user.getName());
        postDTO.setAuthor(userResponse);
        Topic topic = this.topicService.findTopicById(postDTO.getTopic_id());
        postDTO.setTopic(topic);
        postDTO.setCreatedAt(LocalDateTime.now());
        ModelMapper modelMapper = new ModelMapper();
        Post post = this.postService.createPost(modelMapper.map(postDTO, Post.class));
        return ResponseEntity.ok().body(post);
    }




    /**
     * Get all topics
     * @return ResponseEntity (OK or badRequest)
     */
    @GetMapping("/all")

    public ResponseEntity<?> findAllTopics() {

        try{
            List<Post> posts = this.postService.findAllPosts();
            if(posts.isEmpty())
                return ResponseEntity.ok().build();

            return ResponseEntity.ok().body(posts);
        }catch(NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/owned")

    public ResponseEntity<?> owned() {
        try{


            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = this.userService.findByEmail(email);

            Optional<List<Post>> posts = this.postService.findByAuthor(user);
            if(posts.isEmpty())
                return ResponseEntity.ok().build();

            return ResponseEntity.ok().body(posts);
        }catch(NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }



    @GetMapping("/latest")

    public ResponseEntity<?> latest() {


        try{



            List<Post> posts = this.postService.latestPosts();
            if(posts.isEmpty())
                return ResponseEntity.ok().build();

            return ResponseEntity.ok().body(posts);
        }catch(NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }



    @GetMapping("/oldest")

    public ResponseEntity<?>oldest() {


        try{



            List<Post> posts = this.postService.oldestPosts();
            if(posts.isEmpty())
                return ResponseEntity.ok().build();

            return ResponseEntity.ok().body(posts);
        }catch(NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }



    @GetMapping("/findByTopic/{id}")
    public ResponseEntity<?> findByTopic(@PathVariable("id") String id) {
        try{

            Topic topic = this.topicService.findTopicById(Long.valueOf(id));

            Optional<List<Post>> posts = this.postService.findByTopic(topic);
            if(posts.isEmpty())
                return ResponseEntity.ok().build();

            return ResponseEntity.ok().body(posts);
        }catch(NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }


}
