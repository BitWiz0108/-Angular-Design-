package ir.mjimani.basespringboot.service.email;

import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;

import freemarker.template.TemplateException;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.user.User;

/**
 * @author Parvin at 2021-08-05
 * email: 
 * 
 * Spring service interface for the Email.
 */
public interface EmailService {

    void sendForRequestSignup(String to, String code);

    void sendForResetPassword(String displayName, String email, String code);

	void sendActivatedTagEmail(User user, List<Question> questions) throws MessagingException, IOException, TemplateException;
}