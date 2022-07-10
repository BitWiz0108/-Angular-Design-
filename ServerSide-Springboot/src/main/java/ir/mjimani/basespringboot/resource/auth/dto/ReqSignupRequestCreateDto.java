package ir.mjimani.basespringboot.resource.auth.dto;

import ir.mjimani.basespringboot.domain.signupRequest.CodeType;
import ir.mjimani.basespringboot.domain.signupRequest.SignupRequest;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.tools.validation.ValidationTools;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author MjImani at 2021-08-05
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReqSignupRequestCreateDto {

    private String email;

    private CodeType codeType;

    public void validation() throws CustomException {
        ValidationTools.emailValidation(email);
    }

    public SignupRequest map() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setEmail(email);
        signupRequest.setCodeType(codeType);
        return signupRequest;
    }
}
