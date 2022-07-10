package ir.mjimani.basespringboot.security.model;

import ir.mjimani.basespringboot.domain.user.LightUser;
import ir.mjimani.basespringboot.domain.user.User;
import lombok.Data;

import java.io.Serializable;

/**
 * @author Mj Imani
 */
@Data
public class JwtAuthenticationResponse implements Serializable {

    private static final long serialVersionUID = 1250166508152483573L;

    private String accessToken;

    private LightUser user;

    public JwtAuthenticationResponse(String token, LightUser user) {
        accessToken = token;
        this.user = user;
    }
}
