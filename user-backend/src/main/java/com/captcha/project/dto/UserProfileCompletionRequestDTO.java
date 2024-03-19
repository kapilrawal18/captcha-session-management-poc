package com.captcha.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileCompletionRequestDTO {

	private Integer id;
	private String dob;
    private String gender;
    private String nationality;
}
