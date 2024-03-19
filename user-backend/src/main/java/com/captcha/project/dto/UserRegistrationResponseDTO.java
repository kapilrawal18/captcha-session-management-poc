package com.captcha.project.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserRegistrationResponseDTO {
	private Integer id;
	private String message;
	private Date createdDate;
}
