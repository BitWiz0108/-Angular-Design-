package ir.mjimani.basespringboot.service.signupRequest;

import ir.mjimani.basespringboot.domain.signupRequest.SignupRequest;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.exception.error.NotFoundException;
import ir.mjimani.basespringboot.resource.auth.dto.ReqResetPasswordDto;
import ir.mjimani.basespringboot.resource.auth.dto.ReqSignupRequestCreateDto;

/**
 * @author Parvin at 2021-08-05
 * email: 
 * 
 * Spring service interface for the {@link SignupRequest} entity.
 */
public interface SignupRequestService {

    Boolean create(ReqSignupRequestCreateDto reqSignupRequestCreateDto) throws CustomException, NotFoundException;

    Boolean changePassword(ReqResetPasswordDto reqResetPasswordDto) throws CustomException;

    SignupRequest getVerificationDetailsByCode(String code) throws CustomException;
}