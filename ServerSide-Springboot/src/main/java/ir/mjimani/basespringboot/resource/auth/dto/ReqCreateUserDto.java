package ir.mjimani.basespringboot.resource.auth.dto;

import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.tools.validation.ValidationTools;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author MjImani at 2021-06-08
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReqCreateUserDto {

    private String displayName;

    private String email;

    private String password;

    private String code;

    public void validation() throws CustomException {
        ValidationTools.displayNameValidation(displayName);
        ValidationTools.emailValidation(email);
        ValidationTools.passwordValidation(password);
        ValidationTools.nullStringFieldValidation(code, "Code");
    }
}
