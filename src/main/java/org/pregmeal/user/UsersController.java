package org.pregmeal.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;


@RestController
public class UsersController {
    private final UserService userService;
    Jackson2ObjectMapperBuilder mapperBuilder;

    public UsersController(UserService userService, Jackson2ObjectMapperBuilder builder) {
        this.userService = userService;
        this.mapperBuilder = builder;
    }

    @PostMapping("/register")
    public void register(@RequestBody String jsonBody) throws MessagingException, UnsupportedEncodingException {
        userService.registerUser(jsonBody);
    }

    @GetMapping("/verify")
    public String verifyUserWithPath(@RequestParam("code") String verificationCode) {
        return userService.verify(verificationCode) ? "verified" : "not verified";
    }

    @PostMapping("/login")
    @ResponseBody
    public String login(@RequestBody String jsonBody) throws JsonProcessingException {
        ObjectMapper objectMapper = mapperBuilder.build();
        return objectMapper.writeValueAsString(userService.loginUser(jsonBody));
    }

    @GetMapping("/profile")
    @ResponseBody
    public String getUserDetails(@RequestParam("user") Integer id) throws JsonProcessingException {
        ObjectMapper objectMapper = mapperBuilder.build();
        return objectMapper.writeValueAsString(userService.getUser(id));
    }

    @PostMapping("/profile")
    public void changeProfile(@RequestBody String jsonBody) throws JsonProcessingException {
        userService.updateUser(jsonBody);
    }

    @PostMapping("/passwordChange")
    public void changePassword(@RequestParam("user") Integer id, @RequestBody String jsonBody) throws JsonProcessingException {
        userService.updatePassword(id, jsonBody);
    }

    @GetMapping("/create")
    public double getDailyCalorieIntake(@RequestParam("user") Long id){
        return userService.getDailyCalorieIntake(id);
    }
}
