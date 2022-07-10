package ir.mjimani.basespringboot.service.comment;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import ir.mjimani.basespringboot.dao.comment.CommentDao;
import ir.mjimani.basespringboot.dao.question.QuestionDao;
import ir.mjimani.basespringboot.domain.comment.Comment;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import lombok.RequiredArgsConstructor;

/**
 * @author Jay email : hjdsolution@gmail.com skype : jaysolution2 Spring service
 *         interface for the Answer entity.
 */
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final CommentDao entityDao;
	private final QuestionDao questionDao;

	@Override
	public Boolean create(Comment comment) throws CustomException {
		checkQuestion(comment.getQuestionId());
		comment.initToSave();
		comment.setId(new ObjectId().toString());
		return entityDao.createComment(comment);
	}

	public void checkQuestion(String questionId) throws CustomException {
		// Get one
		Question question = questionDao.getOne(questionId);
		if (question == null) {
			throw new CustomException("Question not found.", 406);
		}
	}
}