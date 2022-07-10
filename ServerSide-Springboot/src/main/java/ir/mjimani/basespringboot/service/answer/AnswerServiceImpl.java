package ir.mjimani.basespringboot.service.answer;

import java.util.List;
import java.util.Optional;

import ir.mjimani.basespringboot.domain.reporting.ReportIssue;
import ir.mjimani.basespringboot.service.reporting.ReportIssueService;
import ir.mjimani.basespringboot.service.user.UserService;
import ir.mjimani.basespringboot.service.user.point.UserPoint;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ir.mjimani.basespringboot.dao.answer.AnswerDao;
import ir.mjimani.basespringboot.dao.question.QuestionDao;
import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import ir.mjimani.basespringboot.tools.Print;
import lombok.RequiredArgsConstructor;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring service implementation for the Answer entity.
 */
@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {

    private final AnswerDao entityDao;
    private final QuestionDao questionDao;
    private final UserService userService;
    private final ReportIssueService reportIssueService;

    @Override
    public Answer create(String questionId, Answer answer) throws CustomException {
//        checkQuestion(questionId, "");
        // Get one
        Question question = questionDao.getOne(questionId);
        if (question == null) {
            throw new CustomException("Question not found.", 406);
        }else {
            question.setQuestionStatus(Question.QuestionStatus.WITHPRESENTATION);
            questionDao.delete(questionId);
            questionDao.create(question);
        }
        answer.initToSave();
        answer.setId(new ObjectId().toString());
        Boolean result = entityDao.createAnswer(questionId, answer);
        if (result) {
            return answer;
        } else {
            return null;
        }
    }

    @Override
    public Boolean update(String id, String questionId, Answer answer) throws CustomException {
        checkQuestion(questionId, id);
        return entityDao.updateAnswer(questionId, id, answer);
    }

    @Override
    public Boolean delete(String id, String questionId) throws CustomException {
        checkQuestion(questionId, id);
        userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.DELETE_ANSWER_POINTS.getValue());
        Question question = questionDao.getOne(questionId);
        if (question == null) {
            throw new CustomException("Question not found.", 406);
        }else {
                if(question.getAnswerList().size() == 1) {
                    question.setQuestionStatus(Question.QuestionStatus.NOPRESENTATIONYET);
                    questionDao.update(questionId, question);
                }

            ReportIssue reportIssue = reportIssueService.getOneByAnswerId(id);
                if(reportIssue != null){
                    reportIssueService.delete(reportIssue.getId());
                }

        }
        return entityDao.deleteAnswer(questionId, id);
    }

    public void checkQuestion(String questionId, String answerId) throws CustomException {
        // Get one
        Question question = questionDao.getOne(questionId);
        if (question == null) {
            throw new CustomException("Question not found.", 406);
        }
//        if (!question.getQuestionStatus().equals(Question.QuestionStatus.NOPRESENTATIONYET)) {
//            throw new CustomException("Question is not open.", 407);
//        }
        if (!answerId.isEmpty()) {
            Optional<Answer> answerOptional = question.getAnswerList().stream().filter(i -> i.getId().equals(answerId)).findAny();
            if (answerOptional.isPresent() && answerOptional.get().getIsBestAnswer()) {
                throw new CustomException("Your answer is selected as a best answer and you can not delete/update it.", 407);
            }
        } else {
            // Check exists answer
            if (question.getAnswerList() != null && !question.getAnswerList().isEmpty()) {
                String userId = SecurityUtils.getLoggedInUserId();
                Boolean existsAnswer = question.getAnswerList().stream().anyMatch(answer -> answer.getCreatorId().equals(userId));
//                if (existsAnswer) {
//                    throw new CustomException("You have already answered this question.", 407);
//                }
            }
        }


    }

    @Override
    public Boolean updateUseful(String id, String questionId) throws CustomException {
        // Get userId
        String userId = SecurityUtils.getLoggedInUserId();
        // Get Answer
        Answer answer = entityDao.getOneAnswer(questionId, id);
        if (answer == null) {
            throw new CustomException("Not found answer", 406);
        }
        Boolean result;
        if (answer.getParticipatingIdList() != null && !answer.getParticipatingIdList().isEmpty()) {
            // Check participate
            Optional<String> userIdOptional = answer.getParticipatingIdList().stream()
                    .filter(i -> i.equals(userId))
                    .findAny();
            if (userIdOptional.isPresent()) {
                result = entityDao.updateUsefulAnswer(questionId, id, userId, -1);
                if (result) {
                    return false;
                } else {
                    throw new CustomException("Error in update", 407);
                }
            } else {
                result = entityDao.updateUsefulAnswer(questionId, id, userId, 1);
                if (result) {
                    return true;
                } else {
                    throw new CustomException("Error in update", 407);
                }
            }
        }
        result = entityDao.updateUsefulAnswer(questionId, id, userId, 1);
		if (result) {
			return true;
		} else {
            throw new CustomException("Error in update", 407);
        }
    }

    @Override
    public Page<Question> getMyPage(String term, Long totalElements, Pageable pageable) throws CustomException {
        List<Question> questionList = entityDao.getMyPage(
                term, pageable,
                GeneralDomain.GFN.id, GeneralDomain.GFN.systemCreationDate,
                Question.FN.title, Question.FN.tag, Question.FN.seen,
                Question.FN.creatorDisplayName, Question.FN.questionStatus, Question.FN.usefulCount
        );
        if (questionList != null && !questionList.isEmpty()) {
            Print.print("questionList", questionList.size());
            Long count = entityDao.getMyPageCount(term);
            if (count != null) {
                return new PageImpl<>(questionList, pageable, count);
            }
        }
        return null;
    }

}