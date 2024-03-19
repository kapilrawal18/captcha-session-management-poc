package com.captcha.project.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.captcha.project.dto.UpdateUserRequestDTO;
import com.captcha.project.dto.UpdateUserResponseDTO;
import com.captcha.project.dto.UserContactDetailsRequestDTO;
import com.captcha.project.dto.UserProfileCompletionRequestDTO;
import com.captcha.project.entity.User;
import com.captcha.project.response.APIResponse;
import com.captcha.project.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> findUserById(@PathVariable Integer id) {
        return userService.findUserById(id);
    }

    @PostMapping("/updateProfile")
    public APIResponse<String> updateProfile(@RequestBody UserProfileCompletionRequestDTO userRequest) {
        return userService.updateProfile(userRequest);
    }

    @PutMapping("/updateUser")
    public UpdateUserResponseDTO updateUserData(@Valid @RequestBody UpdateUserRequestDTO updateUserRequestDTO, @RequestParam Integer id) {
        return userService.updateUser(updateUserRequestDTO, id);
    }

    @PostMapping("/saveContactDetails")
    public APIResponse<String> saveContactDetails(@RequestBody UserContactDetailsRequestDTO userRequest) {
        return userService.saveContactDetails(userRequest);
    }
}
