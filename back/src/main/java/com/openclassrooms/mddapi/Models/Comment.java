package com.openclassrooms.mddapi.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

/**
 * Comment entity
 */
@Data
@Entity
@Table(name = "comments")
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@NonNull
	@JoinColumn(name="post_id")
	private Post post;

	@ManyToOne
	@NonNull
	@JoinColumn(name= "user_id")
	private User user;

	@NonNull
	@Size(max = 2000)
	@Column(name = "content")
	private String content;

	@CreatedDate
	@Column(name= "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name= "updated_at")
	private LocalDateTime updatedAt;

	public Comment(){ }
}
