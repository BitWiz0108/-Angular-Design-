package ir.mjimani.basespringboot.resource.auth.dto;

import ir.mjimani.basespringboot.exception.error.CustomException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * @author Parvin at 2021-06-08
 * email: 
 * 
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReqJwtAuthenticationDto implements Serializable {

    private static final long serialVersionUID = -8445943548965154778L;

    private String username;

    private String password;

    public ReqJwtAuthenticationDto(ReqCreateUserDto reqCreateUserDto) {
        username = reqCreateUserDto.getEmail();
        password = reqCreateUserDto.getPassword();
    }

    public void validation() throws CustomException {
        if (username == null || username.isEmpty()){
            throw new CustomException("Username can not be empty!");
        }
        if (password == null || password.isEmpty()){
            throw new CustomException("Password can not be empty!");
        }
    }
}
