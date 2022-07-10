package ir.mjimani.basespringboot.resource.auth;

import ir.mjimani.basespringboot.domain.signupRequest.CodeType;
import ir.mjimani.basespringboot.domain.signupRequest.SignupRequest;
import ir.mjimani.basespringboot.domain.user.LightUser;
import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.exception.error.NotFoundException;
import ir.mjimani.basespringboot.resource.auth.dto.ReqResetPasswordDto;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import ir.mjimani.basespringboot.resource.auth.dto.ReqSignupRequestCreateDto;
import ir.mjimani.basespringboot.security.JwtUserFactory;
import ir.mjimani.basespringboot.security.model.JwtAuthenticationResponse;
import ir.mjimani.basespringboot.resource.auth.dto.ReqCreateUserDto;
import ir.mjimani.basespringboot.resource.auth.dto.ReqJwtAuthenticationDto;
import ir.mjimani.basespringboot.security.tools.JwtTokenUtil;
import ir.mjimani.basespringboot.service.signupRequest.SignupRequestService;
import ir.mjimani.basespringboot.service.user.UserService;
import ir.mjimani.basespringboot.tools.validation.ValidationTools;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author MjImani at 2021-08-06
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring rest controller implementation for the Auth.
 */
@RestController
@RequiredArgsConstructor
public class AuthResourceImpl implements AuthResource {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final UserService userService;

    private final SignupRequestService signupRequestService;

    @Override
    public ResponseEntity<JwtAuthenticationResponse> createAuthenticationToken(ReqJwtAuthenticationDto authenticationRequest) throws AuthenticationException, CustomException {

        // Validation
        authenticationRequest.validation();

        User user = userService.loadUserByEmailForLogin(authenticationRequest.getUsername());

//        if (user == null || !Password.checkPassword(authenticationRequest.getPassword(), user.getPassword())) {
//            throw new CustomException("Username or password is incorrect.");
//        }
        if (!user.getEnabled()) {
            throw new CustomException("Your account has been deactivated.");
        }
        try {
            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // Reload password post-security so we can generate token
            final UserDetails userDetails = JwtUserFactory.create(user, authenticationRequest.getUsername());
            String token = jwtTokenUtil.generateToken(user, userDetails);
            LightUser lightUser = new LightUser();
            lightUser.setId(user.getId());
            lightUser.setEmail(user.getEmail());
            lightUser.setDisplayName(user.getDisplayName());
            lightUser.setRole(user.getRole());
            lightUser.setPoints(user.getPoints());
            lightUser.setActivatedTags(user.getActivatedTags());
            JwtAuthenticationResponse response = new JwtAuthenticationResponse(token, lightUser);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            if (e.getMessage().contains("Bad credentials")) {
                throw new CustomException(e.getMessage());
            }
            throw new CustomException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<JwtAuthenticationResponse> createUser(ReqCreateUserDto reqCreateUserDto) throws CustomException {
        // Validation
        reqCreateUserDto.validation();

        Boolean result = userService.createUser(reqCreateUserDto);
        if (!result) {
            throw new CustomException("Please try again later.");
        }
        // Login
        ReqJwtAuthenticationDto authenticationRequest = new ReqJwtAuthenticationDto(reqCreateUserDto);
        JwtAuthenticationResponse response = createAuthenticationToken(authenticationRequest).getBody();
        return ResponseEntity.ok().body(response);
    }

    @Override
    public ResponseEntity<ResGeneralDto> sendEmail(String email, CodeType codeType) throws CustomException, NotFoundException {
        ValidationTools.emailValidation(email);
        return ResponseEntity.ok().body(new ResGeneralDto(signupRequestService.create(new ReqSignupRequestCreateDto(email, codeType))));
    }

    @Override
    public ResponseEntity<?> changePassword(ReqResetPasswordDto reqResetPasswordDto) throws CustomException {
        reqResetPasswordDto.validation();
        Boolean result = signupRequestService.changePassword(reqResetPasswordDto);
        if (result) {
            // Login user
            ReqJwtAuthenticationDto reqJwtAuthenticationDto = new ReqJwtAuthenticationDto();
            reqJwtAuthenticationDto.setUsername(reqResetPasswordDto.getEmail());
            reqJwtAuthenticationDto.setPassword(reqResetPasswordDto.getPassword());
            return createAuthenticationToken(reqJwtAuthenticationDto);
        }
        return ResponseEntity.ok().body(new ResGeneralDto(false));
    }

    @Override
    public ResponseEntity<SignupRequest> getVerificationDetailsByCode(String code) throws CustomException {
        return ResponseEntity.ok().body(signupRequestService.getVerificationDetailsByCode(code));
    }
    
}
