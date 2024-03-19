package com.captcha.project.exception;

import lombok.Getter;

@Getter
public class UserException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private ErrorResponseDTO errorResponseDTO;
	public UserException(ErrorResponseDTO errorResponseDTO) {
		super(errorResponseDTO.getErrorDetails());
		this.errorResponseDTO=errorResponseDTO;
	}
	
	
}
