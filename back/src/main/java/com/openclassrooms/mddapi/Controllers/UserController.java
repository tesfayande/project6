package com.openclassrooms.mddapi.Controllers;

import com.openclassrooms.mddapi.Models.User;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.service.PasswordValidatorService;
import com.openclassrooms.mddapi.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

/**
 * Class that handles "User" controller
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordValidatorService passwordValidatorService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Gets user information
     * @return ResponseEntity (OK or badRequest)
     */
    @GetMapping()
    public ResponseEntity<?> me(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            if(email == null)
                return ResponseEntity.notFound().build();
            User user = this.userService.findByEmail(email);
            ModelMapper modelMapper = new ModelMapper();
            return ResponseEntity.ok().body(modelMapper.map(user,UserDTO.class));
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Updates a user information
     * @param id id of the user to update
     * @param userDTO Object that contains user request
     * @return ResponseEntity (OK or badRequest)
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody UserDTO userDTO){
        try{
            User initialUser = this.userService.findById(Long.parseLong(id));
            if(initialUser==null){
                return ResponseEntity.badRequest().build();
            }
            // Compare user email != request email (new email) but already taken email
            if(!initialUser.getEmail().equals(userDTO.getEmail()) && this.userService.existsByEmail(userDTO.getEmail())){
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
            }
            if(!this.passwordValidatorService.isValidPassword(userDTO.getPassword())){
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid password format"));
            }
            User savedUser = new User(userDTO.getEmail(), userDTO.getName(), this.passwordEncoder.encode(userDTO.getPassword()), initialUser.getCreatedAt(), LocalDateTime.now());
            ModelMapper modelMapper = new ModelMapper();
            User user = this.userService.update(Long.parseLong(id), savedUser);
            return ResponseEntity.ok().body(modelMapper.map(user, UserDTO.class));
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().build();
        }
    }

}
