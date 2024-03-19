package com.captcha.project.service;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.captcha.project.dto.LoginRequestDTO;
import com.captcha.project.dto.LoginResponseDTO;
import com.captcha.project.dto.UserRegistrationRequestDTO;
import com.captcha.project.dto.UserRegistrationResponseDTO;
import com.captcha.project.entity.User;
import com.captcha.project.exception.ErrorResponseDTO;
import com.captcha.project.exception.UserException;
import com.captcha.project.repository.UserRepository;
import com.captcha.project.response.APIResponse;
import com.captcha.project.util.JwtUtil;
import com.captcha.project.util.Role;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    

    public ResponseEntity<UserRegistrationResponseDTO> saveUser(UserRegistrationRequestDTO user) {
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

        //Check if user already exists
        boolean isUserExists = userRepository.existsByEmail(user.getEmail());
        if(isUserExists){
            throw new UserException(ErrorResponseDTO.builder()
                    .errorCode("403")
                    .errorDetails("User already exists.")
                    .build());
        }

        if (!Pattern.compile(regexPattern).matcher(user.getEmail()).matches()) {
            throw new UserException(
                    ErrorResponseDTO.builder().errorDetails("EMAIL ID NOT VALID").errorCode("500").build());
        }

        Role role = user.getEmail().split("@")[1].equalsIgnoreCase("orioninc.com") ? Role.ADMIN : Role.ACCOUNT_HOLDER;

        User userDB = User.builder().username(user.getUsername()).password(passwordEncoder.encode(user.getPassword()))
                .fullName(user.getFullName()).email(user.getEmail()).role(role).build();

        User savedUser = userRepository.save(userDB);

        return new ResponseEntity<UserRegistrationResponseDTO>(
                UserRegistrationResponseDTO.builder().id(savedUser.getId()).message("User Registered Successfully.")
                        .createdDate(savedUser.getCreatedAt()).build(),
                HttpStatus.CREATED);
    }

    public APIResponse<LoginResponseDTO> authenticate(@RequestBody LoginRequestDTO loginReq){
        try {
            APIResponse<LoginResponseDTO> apiResponse = new APIResponse<>();
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));
            String email = authentication.getName();
            Optional<User> userOptional = userRepository.findByEmail(email);
            if (!userOptional.isPresent()){
                throw new UserException(new ErrorResponseDTO("404", "User not found"));
            }
            User user = userOptional.get();
            User userDetails = User.builder()
                    .fullName(user.getFullName())
                    .email(user.getEmail())
                    .role(user.getRole())
                    .id(user.getId())
                    .isActive(user.isActive())
                    .dob(user.getDob())
                    .createdAt(user.getCreatedAt())
                    .updatedAt(user.getUpdatedAt())
                    .address(user.getAddress())
                    .nationality(user.getNationality())
                    .gender(user.getGender())
                    .countryCode(user.getCountryCode())
                    .phoneNumber(user.getPhoneNumber())
                    .build();
            String token = jwtUtil.createToken(userDetails);
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO(token, userDetails);
            apiResponse.setStatusCode(200);
            apiResponse.setStatusMessage("User logged in successfully");
            apiResponse.setData(loginResponseDTO);
            return apiResponse;

        }catch (BadCredentialsException e){
            return new APIResponse<>(400,"Invalid username or password", null);
        }catch (Exception e){
            return new APIResponse<>(400, e.getMessage(), null);
        }
    }
}
