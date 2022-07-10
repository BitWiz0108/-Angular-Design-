package ir.mjimani.basespringboot.scheduler;

import java.io.IOException;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import freemarker.template.TemplateException;
import ir.mjimani.basespringboot.dao.question.QuestionDao;
import ir.mjimani.basespringboot.dao.user.UserDao;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserTagsNotificationScheduler {

	private final UserDao userDao;
	private final QuestionDao questionDao;
	private final EmailService emailService;

	@Scheduled(cron = "${user.tags.notification.cron}")
	public void sendUserTagsNotification() throws CustomException {

		log.info("Started UserTagsNotificationScheduler at : {}", Calendar.getInstance().getTime());

		List<User> users = userDao.tagsExists();

		CollectionUtils.emptyIfNull(users).parallelStream().forEach(user -> {
			List<String> userTags = user.getActivatedTags().stream().map(u -> u.getId()).collect(Collectors.toList());
			try {
				List<Question> questions = questionDao.findAllByTags(userTags);
				if (CollectionUtils.isNotEmpty(questions)) {
					log.debug("Going to send email to user: {} with no. of questions: {} for tags: {}", user.getId(),
							questions.size(), userTags);
					emailService.sendActivatedTagEmail(user, questions);
				}
			} catch (CustomException | MessagingException | IOException | TemplateException e) {
				log.error("error occurred while sending mail to user: " + user.getId(), e);
			}
		});

		log.info("Finished UserTagsNotificationScheduler at : {}", Calendar.getInstance().getTime());
	}

}
