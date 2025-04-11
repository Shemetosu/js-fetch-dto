package com.kata.openapi.converter;

import com.kata.openapi.model.dto.UserCreateDto;
import com.kata.openapi.model.dto.UserDto;
import com.kata.openapi.model.dto.UserUpdateDto;
import com.kata.openapi.model.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    public User convert(UserDto dto) {
        User entity = new User();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setLastName(dto.getLastName());
        entity.setAge(dto.getAge());
        return entity;
    }

    public User convert(UserCreateDto dto) {
        User entity = new User();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setLastName(dto.getLastName());
        entity.setAge(dto.getAge());
        return entity;
    }

    public User convert(UserUpdateDto dto) {
        User entity = new User();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setLastName(dto.getLastName());
        entity.setAge(dto.getAge());
        return entity;
    }

    public UserDto convert(User entity) {
        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setLastName(entity.getLastName());
        dto.setAge(entity.getAge());
        return dto;
    }
}
