package com.captcha.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = UserException.class)
    public ResponseEntity<ErrorResponseDTO> handleInternalServerError(UserException exception) {
        return new ResponseEntity<ErrorResponseDTO>(exception.getErrorResponseDTO(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

	@ExceptionHandler(value = DataNotFoundException.class)
	public ResponseEntity<ErrorResponseDTO> handleDataNotFound(DataNotFoundException exception) {
		return new ResponseEntity<ErrorResponseDTO>(HttpStatus.NO_CONTENT);
	}

	@ExceptionHandler(value = NullPointerException.class)
	public ResponseEntity<ErrorResponseDTO> handleNullPointerException(NullPointerException exception) {
		return new ResponseEntity<ErrorResponseDTO>(ErrorResponseDTO.builder().errorDetails("Null data found!!!").errorCode("500").build(),
													HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = RuntimeException.class)
	public ResponseEntity<ErrorResponseDTO> handleRuntimeException(RuntimeException exception) {
		return new ResponseEntity<ErrorResponseDTO>(ErrorResponseDTO.builder().errorDetails("Internal Server Error").errorCode("500").build(),
													HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponseDTO> handleInvalidFormatException(HttpMessageNotReadableException httpMessageNotReadableException) {
		return new ResponseEntity<ErrorResponseDTO>(ErrorResponseDTO.builder()
				.errorDetails("Select correct Role: ADMIN/ACCOUNT_HOLDER !!!")
				.errorCode("500").build(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
