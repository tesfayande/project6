package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.openclassrooms.mddapi.Constants.Constants.PASSWORD_PATTERN;


@Service
public class PasswordValidatorService {
    /**
     * Checks if password matches validator pattern
     * @param password
     * @return boolean (true | false)
     */
    public boolean isValidPassword(String password){
        Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
        if(password==null)
            return false;
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }
}
