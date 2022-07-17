package ir.mjimani.basespringboot.tools.validation;

/**
 * @author Parvin at 2021-08-05
 * email: 
 * 
 * Pattern list.
 */
public class PatternList {
	public final static String EMAIL = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";
	public final static String OBJECT_ID = "^[0-9a-fA-F]{24}$";
	public final static String PASSWORD = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()+_\\-\\.]).{9,}$";
	public final static String DISPLAY_NAME = "^([a-zA-Z0-9\\_\\-\\.]{5,})$";
}