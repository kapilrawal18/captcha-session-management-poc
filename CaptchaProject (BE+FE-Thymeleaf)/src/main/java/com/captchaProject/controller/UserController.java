package com.captchaProject.controller;

import cn.apiclub.captcha.Captcha;
import com.captchaProject.model.User;
import com.captchaProject.service.IUserService;
import com.captchaProject.util.CaptchaUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/register")
    public String registerUser(Model model) {
        User user = new User();
        getCaptcha(user);
        model.addAttribute("user", user);
        return "registerUser";
    }

    @PostMapping("/save")
    public String saveUser(@ModelAttribute User user, Model model) {
        if(user.getCaptcha().equals(user.getHiddenCaptcha())) {
            userService.createUser(user);
            model.addAttribute("message", "User registered successfully !!!");
            return "redirect:allUsers";
        } else {
            log.info("Invalid Captcha !!!");
            model.addAttribute("message", "Invalid captcha");
            getCaptcha(user);
            model.addAttribute("user", user);
        }
        return "registerUser";
    }

    @GetMapping("/allUsers")
    public String getAllUsers(Model model) {
        List<User> userList = userService.getAllUsers();
        model.addAttribute("userList", userList);
        return "listUsers";
    }

    private void getCaptcha(User user) {
        Captcha captcha = CaptchaUtil.createCaptcha(240, 70);
        user.setHiddenCaptcha(captcha.getAnswer());
        user.setCaptcha(""); // Value entered by user.
        user.setRealCaptcha(CaptchaUtil.encodeCaptcha(captcha));
    }
}
