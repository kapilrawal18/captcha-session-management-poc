package com.captcha.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.captcha.project.dto.LoginRequestDTO;
import com.captcha.project.dto.LoginResponseDTO;
import com.captcha.project.dto.UserRegistrationRequestDTO;
import com.captcha.project.dto.UserRegistrationResponseDTO;
import com.captcha.project.response.APIResponse;
import com.captcha.project.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserRegistrationResponseDTO> saveUser(@RequestBody UserRegistrationRequestDTO user) {
    	return authService.saveUser(user);
    }
    @PostMapping("/login")
    public APIResponse<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginReq)  {
        return authService.authenticate(loginReq);
    }
}

