package ir.mjimani.basespringboot.security;

/**
 * @author Mj Imani
 */
public class Role {

	public static final String ROLE_PREFIX = "ROLE_";

	public static final String ROLE_ADMIN = ROLE_PREFIX + "ADMIN";
	public static final String ROLE_USER = ROLE_PREFIX + "USER";

	private static final String HASE_ROLE_START = "hasAuthority('";
	private static final String HASE_ROLE_END = "')";


	public static final String PA_ROLE_ADMIN = HASE_ROLE_START + ROLE_ADMIN + HASE_ROLE_END;
	public static final String PA_ROLE_USER = HASE_ROLE_START + ROLE_USER + HASE_ROLE_END;

}
