package ir.mjimani.basespringboot.tools.validation;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author MjImani at 2021-08-05
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Pattern list.
 */
public class PatternValidation {

	public static Boolean base(String value, String regex) {
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(value);
		if (m.find())
			return true;
		return false;
	}

	public static Boolean email(String email) {
		return base(email, PatternList.EMAIL);
	}

	public static Boolean objectId(String objectId) {
		return base(objectId, PatternList.OBJECT_ID);
	}

	public static Boolean password(String password) {
		return base(password, PatternList.PASSWORD);
	}

	public static Boolean displayName(String displayName) {
		return base(displayName, PatternList.DISPLAY_NAME);
	}


}
