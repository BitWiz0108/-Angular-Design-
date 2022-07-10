package ir.mjimani.basespringboot.security;


import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.security.model.JwtUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Mj Imani
 */
@Component
public class JwtUserFactory {
    public JwtUserFactory() {
    }

    public static JwtUser create(User user, String username) {
        return new JwtUser(
                username,
                user.getPassword(),
                user.getEnabled(),
                user.getLastPasswordResetDate(),
                mapToGrantedAuthorities(user.getRole().name()),
                user.getId()
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(String role) {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(Role.ROLE_PREFIX + role);
        grantedAuthorities.add(grantedAuthority);
        return grantedAuthorities;
    }
}
