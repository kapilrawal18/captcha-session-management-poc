package com.captchaProject.service;

import com.captchaProject.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    void createUser(User user);
    List<User> getAllUsers();
    Optional<User> getUserById(Integer id);
}
