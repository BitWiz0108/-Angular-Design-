package ir.mjimani.basespringboot.service.question;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ir.mjimani.basespringboot.dao.question.QuestionDao;
import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import ir.mjimani.basespringboot.tools.Print;
import lombok.RequiredArgsConstructor;

/**
 * @author Parvin at 2021-06-11
 * email: 
 * 
 * Spring service implementation for the Question entity.
 */
@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionDao entityDao;

    @Override
    public String create(Question question) throws CustomException {
        question.initToSave();
        String created = entityDao.create(question);
        
        return created;
    }

    @Override
    public Boolean update(String id, Question question) throws CustomException {
        entityDao.delete(id);
        String updatedId = entityDao.create(question);
        return !updatedId.isEmpty();
    }

    @Override
    public Boolean delete(String id) throws CustomException {
        // Check status
        Question question = entityDao.getOne(id, Question.FN.questionStatus);
        return entityDao.delete(id);
    }

    @Override
    public Question getOne(String id) throws CustomException {
        return entityDao.getOne(id);
    }

    @Override
    public List<Question> getList() throws CustomException {
        return entityDao.getList(
                GeneralDomain.GFN.id, GeneralDomain.GFN.systemCreationDate,
                Question.FN.title, Question.FN.tag, Question.FN.seen,
                Question.FN.creatorDisplayName, Question.FN.questionStatus
        );
    }

    @Override
    public List<Question> getListByTitle(String title) throws CustomException {
        return entityDao.getListByTitle(title);
    }

    @Override
    public Question getOneForShow(String id) throws CustomException {
        return entityDao.getOneForShow(id);
    }

    @Override
    public Question updateBestAnswer(String id, String answerId) throws CustomException {
        // Check status
        Question question = entityDao.getOne(id, Question.FN.questionStatus, Question.FN.answerList);
        if (question == null) {
            throw new CustomException("Not found question", 406);
        }
        if (!question.getQuestionStatus().equals(Question.QuestionStatus.NOPRESENTATIONYET)) {
            throw new CustomException("The question is closed.");
        }
        Boolean updateBestAnswer = entityDao.updateBestAnswer(id, answerId);
        
        if(updateBestAnswer) {
        	return question;
        }
        return null;
    }
    

    @Override
    public Boolean updateUseful(String id) throws CustomException {
        // Get userId
        String userId = SecurityUtils.getLoggedInUserId();
        // Get Question
        Question question = entityDao.getOne(id, Question.FN.participatingIdList);
        if (question == null) {
            throw new CustomException("Not found question", 406);
        }
        Boolean result;
        if (question.getParticipatingIdList() != null && !question.getParticipatingIdList().isEmpty()) {
            // Check participate
            Optional<String> userIdOptional = question.getParticipatingIdList().stream()
                    .filter(i -> i.equals(userId))
                    .findAny();
            if (userIdOptional.isPresent()) {
                result = entityDao.updateUseful(id, userId, -1);
                if (result) {
                    return false;
                } else {
                    throw new CustomException("Error in update", 407);
                }
            } else {
                result = entityDao.updateUseful(id, userId, 1);
                if (result) {
                    return true;
                } else {
                    throw new CustomException("Error in update", 407);
                }
            }
        }
        result = entityDao.updateUseful(id, userId, 1);
        if (result) {
            return true;
        } else {
            throw new CustomException("Error in update", 407);
        }
    }
//    
//    @Override
//    public Boolean addNewComment(String id) throws CustomException {
//        // Get userId
//        String userId = SecurityUtils.getLoggedInUserId();
//        // Get Question
//        Question question = entityDao.getOne(id, Question.FN.participatingIdList.name());
//        if (question == null) {
//            throw new CustomException("Not found question", 406);
//        }
//        Boolean result;
//        if (question.getParticipatingIdList() != null && !question.getParticipatingIdList().isEmpty()) {
//            // Check participate
//            Optional<String> userIdOptional = question.getParticipatingIdList().stream()
//                    .filter(i -> i.equals(userId))
//                    .findAny();
//            if (userIdOptional.isPresent()) {
//                result = entityDao.updateUseful(id, userId, -1);
//                if (result) {
//                    return false;
//                } else {
//                    throw new CustomException("Error in update", 407);
//                }
//            } else {
//                result = entityDao.updateUseful(id, userId, 1);
//                if (result) {
//                    return true;
//                } else {
//                    throw new CustomException("Error in update", 407);
//                }
//            }
//        }
//        result = entityDao.updateUseful(id, userId, 1);
//        if (result) {
//            return true;
//        } else {
//            throw new CustomException("Error in update", 407);
//        }
//    }

    @Override
    public Page<Question> search(String term, List<String> selectedTagList, Pageable pageable, Long totalElements, String liked) throws CustomException {
//        if (Objects.equals(term, "")) {
//        if(!term.isEmpty()){
            List<Question> questionList = entityDao.search(selectedTagList,
                    term,liked, pageable,
                    GeneralDomain.GFN.id, GeneralDomain.GFN.systemCreationDate,
                    Question.FN.title, Question.FN.tag, Question.FN.seen,
                    Question.FN.creatorDisplayName, Question.FN.questionStatus, Question.FN.usefulCount);
            if (questionList != null && !questionList.isEmpty()) {
                Print.print("questionList", questionList.size());
                Long count = entityDao.searchCount(term, selectedTagList, liked );
                if (count != null) {
                    return new PageImpl<>(questionList, pageable, count);
                }
            }
//        }else{
//            List<Question> questionList = entityDao.search(selectedTagList,
//                    term,liked, pageable,
//                    GeneralDomain.GFN.id, GeneralDomain.GFN.systemCreationDate,
//                    Question.FN.title, Question.FN.tag, Question.FN.seen,
//                    Question.FN.creatorDisplayName, Question.FN.questionStatus, Question.FN.usefulCount);
//            if (questionList != null && !questionList.isEmpty()) {
//                Print.print("questionList", questionList.size());
//                Long count = entityDao.searchCount(term, selectedTagList, liked );
//                if (count != null) {
//                    return new PageImpl<>(questionList, pageable, count);
//                }
//            }
//        }
        return null;
    }

    @Override
    public Page<Question> getMyPage(String term, Pageable pageable, Long totalElements) throws CustomException {
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

	@Override
	public Question getOne(String questionId, Object... fields) throws CustomException {
		return entityDao.getOne(questionId, fields);
	}
}