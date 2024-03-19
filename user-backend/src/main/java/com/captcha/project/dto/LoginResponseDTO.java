package com.captcha.project.dto;

import com.captcha.project.entity.User;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private User user;

}
