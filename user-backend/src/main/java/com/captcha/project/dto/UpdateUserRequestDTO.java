package com.captcha.project.dto;

import com.captcha.project.entity.Address;
import com.captcha.project.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequestDTO {
    private Integer id;
    private String fullName;
    private String email;
    private Role role;
    private String dob;
    private String gender;
    private String nationality;
    private Date updatedAt;
    private String countryCode;
    private String phoneNumber;
    private Address address;
}