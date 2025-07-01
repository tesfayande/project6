package com.openclassrooms.mddapi.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

/**
 * Post entity
 */
@Data
@Entity
@Table(name = "posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NonNull
	@ManyToOne
	@JoinColumn(name = "topic")
	private Topic topic;

	@NonNull
	@JoinColumn(name = "topic_id")
	private Long topic_id;

	@NonNull
	@ManyToOne
	@JoinColumn(name="user_id")
	private User author;

	@NonNull
	@Size(max = 50)
	@Column(name="title")
	private String title;

	@NonNull
	@Size(max = 200000)
	@Column(name="content")
	private String content;

	@CreatedDate
	@Column(name= "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name= "updated_at")
	private LocalDateTime updatedAt;

	public Post(){ }

}
