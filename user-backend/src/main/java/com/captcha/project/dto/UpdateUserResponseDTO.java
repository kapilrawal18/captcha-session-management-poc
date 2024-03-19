package com.captcha.project.dto;

import com.captcha.project.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserResponseDTO {
    private String message;
    private Integer statusCode;
    private Optional<User> userData;
}