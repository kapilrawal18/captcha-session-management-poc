package com.captcha.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserContactDetailsRequestDTO {

	private Integer userId;
	private String countryCode;
	private String phoneNumber;
	private String addressLine1;
	private String addressLine2;
	private String city;	
	private String state;
	private String pinCode;
	private String country;
}
