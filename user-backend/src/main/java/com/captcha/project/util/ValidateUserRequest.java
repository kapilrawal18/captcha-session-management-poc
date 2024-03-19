package com.captcha.project.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;

import com.captcha.project.dto.UserContactDetailsRequestDTO;
import com.captcha.project.dto.UserProfileCompletionRequestDTO;
import com.captcha.project.response.APIResponse;

public class ValidateUserRequest {

	public static APIResponse<String> validateUserProfile(UserProfileCompletionRequestDTO userRequest) {
		// empty fields validations
		if(userRequest.getId().intValue() == 0 || userRequest.getDob().isEmpty() || userRequest.getGender().isEmpty() || userRequest.getNationality().isEmpty()){
			return new APIResponse<String>(HttpStatus.BAD_REQUEST.value(),
					"Fields can not be empty!!!",
					null);
		}

		// alphabetic validations
	/*	if(!Pattern.compile("^[a-zA-Z]+").matcher(userRequest.getGender()).matches() || !Pattern.compile("^[a-zA-Z- ]+").matcher(userRequest.getNationality()).matches() ) {
			return new APIResponse<String>(HttpStatus.BAD_REQUEST.value(),
					"Gender and Nationality fields contains only alphabetic value!!!",
					null);			
		} */

		// dob validation
		DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		sdf.setLenient(false);
		try {
			sdf.parse(userRequest.getDob());
		} catch (ParseException e) {
			return new APIResponse<String>(HttpStatus.BAD_REQUEST.value(),
					"Invalid date!!! DOB must be dd/MM/yyyy format.",
					null);				
		}
		return null;
	}

	public static APIResponse<String> validateUserContactDetails(UserContactDetailsRequestDTO userRequest) {
		// empty fields validations
		if(userRequest.getUserId().intValue() == 0 || userRequest.getCountryCode().isEmpty() || userRequest.getPhoneNumber().isEmpty() || userRequest.getCity().isEmpty() || userRequest.getState().isEmpty() || userRequest.getPinCode().isEmpty() || userRequest.getCountry().isEmpty()){
			return new APIResponse<String>(HttpStatus.BAD_REQUEST.value(),
					"Fields can not be empty!!!",
					null);
		}
		
		// alphabetic validations
	/*	if(!Pattern.compile("^[a-zA-Z]+").matcher(userRequest.getCity()).matches() || !Pattern.compile("^[a-zA-Z]+").matcher(userRequest.getState()).matches() || !Pattern.compile("^[a-zA-Z]+").matcher(userRequest.getCountry()).matches()) {
			return new APIResponse<String>(HttpStatus.BAD_REQUEST.value(),
					"City, State, Country fields contains only alphabetic value!!!",
					null);
		}
		
		// pin code validation
		if(!Pattern.compile("^[0-9]{6}").matcher(String.valueOf(userRequest.getPinCode().intValue())).matches()) {
			return new APIResponse<String>(HttpStatus.BAD_REQUEST.value(),
					"Invalid Pin code found!!!",
					null);
		}*/
		
		// phone number
		if(!Pattern.compile("\\d{10}|(?:\\d{3}-){2}\\d{4}|\\(\\d{3}\\)\\d{3}-?\\d{4}").matcher(userRequest.getPhoneNumber()).matches()) {
			return new APIResponse<String>(HttpStatus.BAD_REQUEST.value(),
					"Invalid Phone number found!!!",
					null);
		}
		return null;

	}
}
