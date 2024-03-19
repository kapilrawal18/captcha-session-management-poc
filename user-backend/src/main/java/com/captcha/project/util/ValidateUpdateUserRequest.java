package com.captcha.project.util;

import com.captcha.project.dto.UpdateUserRequestDTO;
import com.captcha.project.dto.UpdateUserResponseDTO;
import org.springframework.http.HttpStatus;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class ValidateUpdateUserRequest {
    public static UpdateUserResponseDTO validateUpdateUserData(UpdateUserRequestDTO updateUserRequestDTO, Integer id) {
        if (
                id == 0 ||
                updateUserRequestDTO.getFullName().isEmpty() ||
                updateUserRequestDTO.getEmail().isEmpty() ||
                updateUserRequestDTO.getDob().isEmpty() ||
                updateUserRequestDTO.getGender().isEmpty() ||
                updateUserRequestDTO.getCountryCode().isEmpty() ||
                updateUserRequestDTO.getPhoneNumber().isEmpty() ||
                updateUserRequestDTO.getAddress().getAddressLine1().isEmpty() ||
                updateUserRequestDTO.getAddress().getCity().isEmpty() ||
                updateUserRequestDTO.getAddress().getState().isEmpty() ||
                updateUserRequestDTO.getAddress().getPinCode().isEmpty() ||
                updateUserRequestDTO.getAddress().getCountry().isEmpty()
        ) {
            return new UpdateUserResponseDTO("Fields can not be empty!!!", HttpStatus.BAD_REQUEST.value(), null);
        }

        if (!updateUserRequestDTO.getGender().equalsIgnoreCase("MALE") &&
                !updateUserRequestDTO.getGender().equalsIgnoreCase("FEMALE") &&
                !updateUserRequestDTO.getGender().equalsIgnoreCase("OTHER")) {
            return new UpdateUserResponseDTO("Gender should be Male/Female/Other !!!", HttpStatus.BAD_REQUEST.value(), null);
        }

        DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        sdf.setLenient(false);
        try {
            sdf.parse(updateUserRequestDTO.getDob());
        } catch (ParseException e) {
            return new UpdateUserResponseDTO("Invalid date!!! DOB must be dd/MM/yyyy format.", HttpStatus.BAD_REQUEST.value(), null);
        }
        return null;
    }
}