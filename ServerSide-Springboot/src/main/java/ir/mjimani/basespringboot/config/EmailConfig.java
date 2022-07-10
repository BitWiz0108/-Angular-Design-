package ir.mjimani.basespringboot.config;

/**
 * @author MjImani at 2021-08-06
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 */
public class EmailConfig {

    public static final String EMAIL_FROM = "info@butshowme.com";
    public static final String REQUEST_SIGNUP_SUBJECT = "Signup Request";
    public static final String RESET_PASSWORD_SUBJECT = "Password Reset Request";

    public static final String WEBSITE_LINK = "http://localhost:4200/";
    public static final String CLIENT_SIDE_LINK = WEBSITE_LINK + "#/auth/verification?code=";
    
    public static final String QUESTION_LIST = "Question List";
   	public static final String EMAIL_FTLH = "email.ftlh";

    public static String getMessageForRequestSignup(String code) {
        return "Dear User,\n" +
                "\n" +
                "You registered an account on www.ButShowMe.com. Before being able to use your account you need to verify that this is your email address by clicking here:\n" +
                CLIENT_SIDE_LINK + code + "\n" +
                "\n" +
                "Please notice that the link will expire within 2 hours. After 2 hours, you must submit a new request.\n" +
                "\n" +
                "If you did not register on ButShowMe.com, ignore this email.\n" +
                "\n" +
                "Kind Regards,\n" +
                "ButShowMe Support Team";
    }

    public static String getMessageForForgotPassword(String displayName, String code) {
        return "Dear " + displayName + ",\n" +
                "\n" +
                "We received your request to reset your www.ButShowMe.com password. To continue, please click here: \n" +
                CLIENT_SIDE_LINK + code + "\n" +
                "\n" +
                "Please notice that the link will expire within 24 hours. After 24 hours, you must submit a new password reset request.\n" +
                "\n" +
                "If you did not request for a password reset, ignore this email.\n" +
                "\n" +
                "Kind Regards,\n" +
                "ButShowMe Support Team";
    }
}
