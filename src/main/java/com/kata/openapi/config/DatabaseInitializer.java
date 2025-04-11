package com.kata.openapi.config;

import com.kata.openapi.model.entity.User;
import com.kata.openapi.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer {

    private final UserService userService;

    public DatabaseInitializer(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        while (userService.getAllUsers().size() < 3) {
            User user = new User("James",
                    "Brown",
                    27);
            userService.saveUser(user);
        }
    }
}
