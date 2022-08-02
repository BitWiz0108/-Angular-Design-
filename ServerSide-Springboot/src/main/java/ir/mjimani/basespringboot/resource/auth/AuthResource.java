package ir.mjimani.basespringboot.resource.auth;

import ir.mjimani.basespringboot.domain.signupRequest.CodeType;
import ir.mjimani.basespringboot.domain.signupRequest.SignupRequest;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.exception.error.NotFoundException;
import ir.mjimani.basespringboot.resource.auth.dto.ReqResetPasswordDto;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import ir.mjimani.basespringboot.resource.auth.dto.ReqCreateUserDto;
import ir.mjimani.basespringboot.resource.auth.dto.ReqJwtAuthenticationDto;
import ir.mjimani.basespringboot.security.model.JwtAuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

/**
 * @author Parvin at 2021-08-06
 * email: 
 * 
 * Spring rest controller interface for the Auth.
 */
@RequestMapping("auth")
public interface AuthResource {

    @PostMapping("login")
    ResponseEntity<JwtAuthenticationResponse> createAuthenticationToken(@RequestBody ReqJwtAuthenticationDto authenticationRequest) throws AuthenticationException, CustomException;

    @PostMapping("signup")
    ResponseEntity<JwtAuthenticationResponse> createUser(@RequestBody ReqCreateUserDto reqCreateUserDto) throws CustomException;

    @GetMapping("send-email")
    ResponseEntity<ResGeneralDto> sendEmail(@RequestParam("email") String email, @RequestParam("codeType") CodeType codeType) throws CustomException, NotFoundException;

    @PutMapping("change-password")
    ResponseEntity<?> changePassword(@RequestBody ReqResetPasswordDto reqResetPasswordDto) throws CustomException;

    @GetMapping("get-verification-details-by-code")
    ResponseEntity<SignupRequest> getVerificationDetailsByCode(@RequestParam("code") String code) throws CustomException;

}
