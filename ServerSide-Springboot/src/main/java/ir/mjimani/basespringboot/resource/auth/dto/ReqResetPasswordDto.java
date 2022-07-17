package ir.mjimani.basespringboot.resource.auth.dto;

import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.tools.validation.ValidationTools;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Parvin at 2021-08-06
 * email: 
 * 
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReqResetPasswordDto {

    private String email;

    private String password;

    private String code;

    public void validation() throws CustomException {
        ValidationTools.emailValidation(email);
        ValidationTools.passwordValidation(password);
        ValidationTools.nullStringFieldValidation(code, "Code");
    }
}
