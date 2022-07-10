package ir.mjimani.basespringboot.service.email;

import static ir.mjimani.basespringboot.config.EmailConfig.EMAIL_FROM;
import static ir.mjimani.basespringboot.config.EmailConfig.EMAIL_FTLH;
import static ir.mjimani.basespringboot.config.EmailConfig.QUESTION_LIST;
import static ir.mjimani.basespringboot.config.EmailConfig.REQUEST_SIGNUP_SUBJECT;
import static ir.mjimani.basespringboot.config.EmailConfig.RESET_PASSWORD_SUBJECT;
import static ir.mjimani.basespringboot.config.EmailConfig.getMessageForForgotPassword;
import static ir.mjimani.basespringboot.config.EmailConfig.getMessageForRequestSignup;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.user.User;
import lombok.RequiredArgsConstructor;

/**
 * @author MjImani at 2021-08-05 email : mjimani.ir@gmail.com phone :
 *         +989191414931 Spring service implementation for the Email.
 */
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

	private final JavaMailSender javaMailSender;
	private final Configuration configuration;
	@Value("${user.tags.notification.questionHyperLink}")
	private String questionHyperLink;

	@Override
	public void sendForRequestSignup(String to, String code) {
		System.out.println("to = " + to);
		System.out.println("code = " + code);
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(EMAIL_FROM);
		message.setTo(to);
		message.setSubject(REQUEST_SIGNUP_SUBJECT);
		message.setText(getMessageForRequestSignup(code));
		System.out.println("javaMailSender before");
		try {
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("javaMailSender finish");
	}

	@Override
	public void sendForResetPassword(String displayName, String to, String code) {
		System.out.println("to = " + to);
		System.out.println("code = " + code);
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(EMAIL_FROM);
		message.setTo(to);
		message.setSubject(RESET_PASSWORD_SUBJECT);
		message.setText(getMessageForForgotPassword(displayName, code));
		System.out.println("javaMailSender before");
		try {
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("javaMailSender finish");
	}

	@Override
	public void sendActivatedTagEmail(User user, List<Question> questions)
			throws MessagingException, IOException, TemplateException {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
		helper.setSubject(QUESTION_LIST);
		helper.setFrom(EMAIL_FROM);
		helper.setTo(user.getEmail());
		String emailContent = getEmailContent(user, questions);
		helper.setText(emailContent, true);
		javaMailSender.send(mimeMessage);
	}

	private String getEmailContent(User user, List<Question> questions) throws IOException, TemplateException {
		StringWriter stringWriter = new StringWriter();
		Map<String, Object> model = new HashMap<>();
		List<String> tags = user.getActivatedTags().stream().map(t -> t.getTitle()).collect(Collectors.toList());

		model.put("name", user.getDisplayName());
		model.put("tags", tags);
		model.put("questions", questions);
		model.put("questionHyperLink", questionHyperLink);
		configuration.getTemplate(EMAIL_FTLH).process(model, stringWriter);
		return stringWriter.getBuffer().toString();
	}
}