package com.openclassrooms.mddapi.service;



import com.openclassrooms.mddapi.Models.Comment;
import com.openclassrooms.mddapi.Models.Post;
import com.openclassrooms.mddapi.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Class that handles Comment features
 */
@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    /**
     * Creates a comment
     * @param comment entity
     * @return Comment
     */
    public Comment create(Comment comment){
        return this.commentRepository.save(comment);
    }

    /**
     * Finds all comments of a post
     * @param post entity
     * @return Optional<List<Comment>>
     */
    public Optional<List<Comment>> findAllCommentsByPost(Post post){
        return this.commentRepository.findByPost(post);
    }
}
