package com.openclassrooms.mddapi.Controllers;




import com.openclassrooms.mddapi.Models.User;
import com.openclassrooms.mddapi.payload.request.LoginRequest;
import com.openclassrooms.mddapi.payload.request.SignupRequest;
import com.openclassrooms.mddapi.payload.response.JwtResponse;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.security.jwt.JwtUtils;
import com.openclassrooms.mddapi.security.services.UserDetailsImpl;
import com.openclassrooms.mddapi.service.PasswordValidatorService;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * Class that handles "Authentication" controller
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")

public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordValidatorService passwordValidatorService;

    /**
     * Login method controller
     * @param loginRequest  Login request object that contains credentials
     * @return ResponseEntity (OK or error)
     */

    @CrossOrigin(origins = "http://localhost:4200")

    @PostMapping("/login")

    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = this.jwtUtils.generateJwtToken(authentication);
        Date expired=this.jwtUtils.getExpiration(token);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = this.userService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(new JwtResponse(token,expired,user.getId(),user.getName(), user.getEmail()));







    }

    /**
     * Register method controller
     * @param signupRequest Signup request object that contains credentials
     * @return ResponseEntity (OK or badRequest)
     */


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")

    public ResponseEntity<?> register(@RequestBody SignupRequest signupRequest){
        if(this.userService.existsByEmail(signupRequest.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
        }
        if(!this.passwordValidatorService.isValidPassword(signupRequest.getPassword())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid password format"));
        }
        User user = new User(signupRequest.getEmail(), signupRequest.getName(), this.passwordEncoder.encode(signupRequest.getPassword()), LocalDateTime.now(), LocalDateTime.now());
        this.userService.createUser(user);
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signupRequest.getEmail(), signupRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = this.jwtUtils.generateJwtToken(authentication);
        Date expired=this.jwtUtils.getExpiration(token);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = this.userService.findByEmail(userDetails.getUsername()).getId();
        return ResponseEntity.ok(new JwtResponse(token,expired,userId,signupRequest.getName(), user.getEmail()));
    }






    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/expiredtoken/{token}")
    public ResponseEntity<?> tokenEpired(@PathVariable("token") String token){


        Boolean Checktoken = this.jwtUtils.checkTokenExpired(token);

        return ResponseEntity.ok(Checktoken);
    }


}
