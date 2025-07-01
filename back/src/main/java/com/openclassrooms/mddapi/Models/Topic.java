package com.openclassrooms.mddapi.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;


/**
 * Topic entity
 */
@Data
@Entity
@Table(name = "topics")
public class Topic {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@NonNull
	@Size(max = 50)
	@Column(name="name",nullable = false)
	private String name;

	@NonNull
	@Size(max = 200000)
	@Column(name="description")
	private String description;




    @NonNull
    @ManyToOne
    @JoinColumn(name="user_id")
    private User author;



	@CreatedDate
	@Column(name= "created_at")
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name= "updated_at")
	private LocalDateTime updatedAt;


	public Topic(Long id, String name, String description){
		this.id=id;
		this.name=name;
		this.description=description;
	}



	public Topic(){ }
}
