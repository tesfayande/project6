package com.openclassrooms.mddapi.Controllers;

import com.openclassrooms.mddapi.Models.Comment;
import com.openclassrooms.mddapi.Models.Post;
import com.openclassrooms.mddapi.Models.User;
import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.service.CommentService;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Class that handles "Comment" controller
 */

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;


    /**
     * Create a comment
     * @param commentDTO Object that contains comment request
     * @return ResponseEntity (OK)
     */
    @PostMapping()
    public ResponseEntity<?> createComment(@RequestBody CommentDTO commentDTO){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = this.userService.findByEmail(email);
        Post post = this.postService.findPostById(commentDTO.getPostId());

        if(post==null)
            return ResponseEntity.badRequest().build();

        commentDTO.setUser(user);
        commentDTO.setCreatedAt(LocalDateTime.now());
        commentDTO.setUpdatedAt(LocalDateTime.now());
        ModelMapper modelMapper = new ModelMapper();
        Comment comment = this.commentService.create(modelMapper.map(commentDTO, Comment.class));
        return ResponseEntity.ok().body(modelMapper.map(comment, CommentDTO.class));
    }

    /**
     * Get all comments of a post
     * @param postId id of the post
     * @return ResponseEntity (OK or badRequest)
     */
    @GetMapping("/{postId}")
    public ResponseEntity<?> getAllCommentsByPostId(@PathVariable("postId") String postId){
        try{
            Post post = this.postService.findPostById(Long.valueOf(postId));
            if(post == null)
                return ResponseEntity.badRequest().build();

            Optional<List<Comment>> comments = this.commentService.findAllCommentsByPost(post);

            if(comments.isEmpty())
                return ResponseEntity.ok().body(new ArrayList());
            List<CommentDTO> commentsList = new ArrayList<>();
            ModelMapper modelMapper = new ModelMapper();
            for(Comment comment : comments.get()){
                commentsList.add(modelMapper.map(comment, CommentDTO.class));
            }
            return ResponseEntity.ok().body(commentsList);
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

}
