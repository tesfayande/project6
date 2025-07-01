package com.openclassrooms.mddapi.security.jwt;



import com.openclassrooms.mddapi.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.function.Function;

import static com.openclassrooms.mddapi.Constants.Constants.EXPIRATION_TIME;


/**
 * JwtUtils class
 */
@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    private String secretkey="";



    public JwtUtils() {
        try {
            KeyGenerator keyGen=KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk=keyGen.generateKey();
            secretkey= Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }


    /**
     * Generate a JWT token
     * @param authentication
     * @return String (token)
     */
    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        Map<String, Objects> claims=new HashMap<>();


        return Jwts.builder()
                .claims()
                .add(claims)
                .subject((userPrincipal.getUsername()))
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + EXPIRATION_TIME))
                .and()
                .signWith(getKey())
                .compact();

    }

    /**
     * Get username from token
     * @param token
     * @return String (username)
     */
    public String getUserNameFromJwtToken(String token) {


        return extractClaim(token, Claims::getSubject);

    }

    /**
     * Validate JWT token
     * @param authToken
     * @return boolean (true | false)
     */
    public boolean validateJwtToken(String authToken, UserDetails userDetails) {
        try {


            final String userName = extractUserName(authToken);
            return (userName.equals(userDetails.getUsername()) && !isTokenExpired(authToken));
            /*
            Jwts.parser().setSigningKey(SECRET).getClass(authToken);
            return true;

             */
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    /**
     * Get token properties
     * @param token
     * @return Claims
     */

    public Claims getClaims(String token) {

        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }









    public String generateToken(String name) {

        Map<String, Objects> claims=new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(name)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000*60*60*24 ))
                .and()
                .signWith(getKey())
                .compact();

    }






    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretkey);
        return Keys.hmacShaKeyFor(keyBytes);
    }






    public String extractUserName(String token) {
        // extract the username from jwt token
        return extractClaim(token, Claims::getSubject);
    }








    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }







    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }














    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }




    public boolean checkTokenExpired(String token) {

        return extractExpiration(token).before(new Date());
    }


    //validate token
    public Boolean validateToken(String token) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


    public Date getExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }









}
