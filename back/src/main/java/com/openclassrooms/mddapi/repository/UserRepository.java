package com.openclassrooms.mddapi.repository;


import com.openclassrooms.mddapi.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * UserRepository interface
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    User findByEmail(String email);

    Boolean existsByEmail(String email);
}
