package ir.mjimani.basespringboot.security.tools;

import ir.mjimani.basespringboot.security.model.JwtUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collection;

/**
 * @author Parvin
 */
public class SecurityUtils {

	public static String getLoggedInUserId() {
		JwtUser user = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return user.getUserId();
	}

	public static Collection<? extends GrantedAuthority> getLoggedInAuthority() {
		JwtUser user = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return user.getAuthorities();
	}

}
