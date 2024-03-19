package com.captcha.project.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.captcha.project.dto.UpdateUserRequestDTO;
import com.captcha.project.dto.UpdateUserResponseDTO;
import com.captcha.project.dto.UserContactDetailsRequestDTO;
import com.captcha.project.dto.UserProfileCompletionRequestDTO;
import com.captcha.project.entity.Address;
import com.captcha.project.entity.User;
import com.captcha.project.exception.ErrorResponseDTO;
import com.captcha.project.exception.UserException;
import com.captcha.project.repository.UserRepository;
import com.captcha.project.response.APIResponse;
import com.captcha.project.util.Role;
import com.captcha.project.util.ValidateUpdateUserRequest;
import com.captcha.project.util.ValidateUserRequest;

@Service
public class UserService implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user;
        } else {
            throw new UserException(ErrorResponseDTO.builder()
                    .errorDetails("User not found!!! Please enter correct User ID").errorCode("500").build());
        }
    }

    public APIResponse<String> updateProfile(UserProfileCompletionRequestDTO userRequest) {
        // validations
        ValidateUserRequest.validateUserProfile(userRequest);

        Optional<User> user = userRepository.findById(userRequest.getId());
        // error response
        if (!user.isPresent()) {
            throw new UserException(ErrorResponseDTO.builder()
                    .errorDetails("User not found!!!")
                    .errorCode("404").build());
        }

        //user.get().setActive(Boolean.TRUE);
        try {
            user.get().setDob(new SimpleDateFormat("dd/MM/yyyy").parse(userRequest.getDob()));

        } catch (ParseException e) {
            e.printStackTrace();

        }
        user.get().setGender(userRequest.getGender().substring(0, 1).toUpperCase() + userRequest.getGender().substring(1));
        user.get().setNationality(userRequest.getNationality().substring(0, 1).toUpperCase() + userRequest.getNationality().substring(1));

        // update user data
        userRepository.saveAndFlush(user.get());

        // success response
        return new APIResponse<String>(HttpStatus.CREATED.value(),
                "User profile saved successfully.",
                null);

    }

    @Override
    public UserDetails loadUserByUsername(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (!userOptional.isPresent()) {
            throw new UserException(new ErrorResponseDTO("404", "User not found"));
        }
        User user = userOptional.get();
        List<String> roles = new ArrayList<>();
        roles.add(user.getRole().name());
        UserDetails userDetails =
                org.springframework.security.core.userdetails.User.builder()
                        .username(user.getEmail())
                        .password(user.getPassword())
                        .roles(roles.toArray(new String[0]))
                        .build();
        return userDetails;

    }

	public UpdateUserResponseDTO updateUser(UpdateUserRequestDTO updateUserRequestDTO, Integer id) {
		UpdateUserResponseDTO errorResponse = ValidateUpdateUserRequest.validateUpdateUserData(updateUserRequestDTO, id);
		if (errorResponse != null) {
			return errorResponse;
		}
		Optional<User> userData = userRepository.findById(id);
		if (userData.get().getRole().equals(Role.ACCOUNT_HOLDER)) {
			if (userData.isPresent()) {
				userData.get().setFullName(updateUserRequestDTO.getFullName());
				userData.get().setEmail(updateUserRequestDTO.getEmail());
				userData.get().setRole(updateUserRequestDTO.getRole());
				try {
					userData.get().setDob(new SimpleDateFormat("dd/MM/yyyy").parse(updateUserRequestDTO.getDob()));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				userData.get().setGender(updateUserRequestDTO.getGender());
				userData.get().setNationality(updateUserRequestDTO.getNationality());
				userData.get().setActive(Boolean.TRUE);
				userData.get().setUpdatedAt(new Date());

				userData.get().setCountryCode(updateUserRequestDTO.getCountryCode());
				userData.get().setPhoneNumber(updateUserRequestDTO.getPhoneNumber());
				if (userData.get().getAddress() != null) {
					userData.get().setAddress(Address.builder()
							.id(userData.get().getAddress().getId())
							.addressLine1(updateUserRequestDTO.getAddress().getAddressLine1())
							.addressLine2(updateUserRequestDTO.getAddress().getAddressLine2())
							.city(updateUserRequestDTO.getAddress().getCity())
							.state(updateUserRequestDTO.getAddress().getState())
							.country(updateUserRequestDTO.getAddress().getCountry())
							.pinCode(updateUserRequestDTO.getAddress().getPinCode())
							.build());
				} else {
					userData.get().setAddress(Address.builder()
							.addressLine1(updateUserRequestDTO.getAddress().getAddressLine1())
							.addressLine2(updateUserRequestDTO.getAddress().getAddressLine2())
							.city(updateUserRequestDTO.getAddress().getCity())
							.state(updateUserRequestDTO.getAddress().getState())
							.country(updateUserRequestDTO.getAddress().getCountry())
							.pinCode(updateUserRequestDTO.getAddress().getPinCode())
							.build());
				}

				userRepository.save(userData.get());
				return new UpdateUserResponseDTO("User data updated successfully !!!", HttpStatus.OK.value(), userData);
			}
			return new UpdateUserResponseDTO("User not found !!!", HttpStatus.NOT_FOUND.value(), null);
		}
		return new UpdateUserResponseDTO("Admin details cannot be updated !!!", HttpStatus.BAD_REQUEST.value(), null);
	}

    public APIResponse<String> saveContactDetails(UserContactDetailsRequestDTO userRequest) {
        // validations
        APIResponse<String> errors = ValidateUserRequest.validateUserContactDetails(userRequest);
        if (errors != null) {
            return errors;
        }

        Optional<User> user = userRepository.findById(userRequest.getUserId());
        // error response
        if (!user.isPresent()) {
            return new APIResponse<>(HttpStatus.NOT_FOUND.value(),
                    "User not found!!!",
                    null);
        }
        user.get().setActive(Boolean.TRUE);
        user.get().setCountryCode(userRequest.getCountryCode());
        user.get().setPhoneNumber(userRequest.getPhoneNumber());
        user.get().setAddress(Address.builder()
                .addressLine1(userRequest.getAddressLine1())
                .addressLine2(userRequest.getAddressLine2())
                .city(userRequest.getCity())
                .state(userRequest.getState().substring(0, 1).toUpperCase() + userRequest.getState().substring(1))
                .country(userRequest.getCountry().substring(0, 1).toUpperCase() + userRequest.getCountry().substring(1))
                .pinCode(userRequest.getPinCode())
                .build());

        userRepository.saveAndFlush(user.get());

        // success response
        return new APIResponse<String>(HttpStatus.OK.value(),
                "User contact details saved successfully.",
                null);
    }
}
