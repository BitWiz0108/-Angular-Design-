package ir.mjimani.basespringboot.dao.signupRequest;

import ir.mjimani.basespringboot.domain.signupRequest.CodeType;
import ir.mjimani.basespringboot.domain.signupRequest.SignupRequest;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author MjImani at 2021-08-05
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring Data MongoDB dao interface for the {@link SignupRequest} entity.
 */
public interface SignupRequestDao {

    Boolean save(SignupRequest signupRequest) throws CustomException;

    Boolean codeExists(String code) throws CustomException;

    SignupRequest findOneByEmailAndCodeAndType(String email, String code, CodeType forgetPassword) throws CustomException;

    SignupRequest getVerificationDetailsByCode(String code) throws CustomException;

    Boolean deleteById(String id) throws CustomException;
}
