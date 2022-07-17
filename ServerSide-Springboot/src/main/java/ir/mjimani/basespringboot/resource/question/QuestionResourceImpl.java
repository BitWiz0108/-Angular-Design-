package ir.mjimani.basespringboot.resource.question;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RestController;

import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import ir.mjimani.basespringboot.service.question.QuestionService;
import ir.mjimani.basespringboot.service.user.UserService;
import ir.mjimani.basespringboot.service.user.point.UserPoint;
import lombok.RequiredArgsConstructor;

/**
 * @author Parvin at 2021-06-11 email:  phone :
 * +989191414931 Spring rest controller implementation for the Question
 * entity.
 */
@RestController
@RequiredArgsConstructor
public class QuestionResourceImpl implements QuestionResource {

    private final QuestionService questionService;
    private final UserService userService;

    @Override
    public ResponseEntity<ResGeneralDto> create(Question question) throws CustomException {
        // Validation
        String result = questionService.create(question);
        if (result != null && !result.isEmpty()) {
            userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.QUESTION_ASK_POINT.getValue());
            return ResponseEntity.ok().body(new ResGeneralDto(result));
        } else {
            throw new CustomException("Error in create :: ");
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> update(String id, Question question) throws CustomException {
        // Validation

        Boolean result = questionService.update(id, question);
        if (result != null && result) {
            return ResponseEntity.ok().body(new ResGeneralDto(true));
        } else {
            throw new CustomException("Error in update :: " + id);
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> delete(String id) throws CustomException {
        // Validation
        Question question = questionService.getOne(id);

        if (question == null) {
            throw new CustomException("Not found question", 406);
        }

        if (!question.getCreatorId().equals(SecurityUtils.getLoggedInUserId())) {
            throw new CustomException("Error in delete :: " + id);
        }

        for (Answer answer : question.getAnswerList()) {
            if (!answer.getCreatorId().equals(question.getCreatorId())) {
                throw new CustomException("Question contains other user answer :: " + id);
            }
        }


        Boolean result = questionService.delete(id);
        if (result != null && result) {
            userService.addPoints(SecurityUtils.getLoggedInUserId(), (UserPoint.DELETE_ANSWER_POINTS.getValue() * question.getAnswersCount()));
            userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.QUESTION_DELETE_POINT.getValue());
            return ResponseEntity.ok().body(new ResGeneralDto(true));
        } else {
            throw new CustomException("Error in delete :: " + id);
        }
    }

    @Override
    public ResponseEntity<Question> getOne(String id) throws CustomException {
        // Validation
        Question question = questionService.getOne(id);
        if (question != null) {
            return ResponseEntity.ok().body(question);
        } else {
            throw new CustomException("Not found entity", 406);
        }
    }

    @Override
    public ResponseEntity<List<Question>> getList() throws CustomException {
        // Validation

        List<Question> questionList = questionService.getList();
        if (questionList == null) {
            questionList = new ArrayList<>();
        }
        return ResponseEntity.ok().body(questionList);
    }

    @Override
    public ResponseEntity<List<Question>> getListByTitle(String title) throws CustomException {
        List<Question> questionList = questionService.getListByTitle(title);
        List<Question> emptyList = new ArrayList<>();
        if (questionList.size() > 0) {
            return ResponseEntity.ok().body(questionList);
        }
        return ResponseEntity.ok().body(emptyList);
    }

    @Override
    public ResponseEntity<Question> getOneForShow(String id) throws CustomException {
        // Validation
        Question question = questionService.getOneForShow(id);
        if (question != null) {
            return ResponseEntity.ok().body(question);
        } else {
            throw new CustomException("Not found entity", 406);
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> updateBestAnswer(String id, String answerId) throws CustomException {
        // Validation
        Question question = questionService.updateBestAnswer(id, answerId);
        if (question != null) {
            if (!CollectionUtils.isEmpty(question.getAnswerList())) {
                Optional<Answer> findFirst = question.getAnswerList().stream().filter(qu -> qu.getId().equals(answerId)).findFirst();
                userService.addPoints(findFirst.get().getCreatorId(), UserPoint.ANS_ACCEPTANCE_POINTS_TO_ANSWER.getValue());
            }
            userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.ANS_ACCEPTANCE_POINTS_TO_ASKER.getValue());
            return ResponseEntity.ok().body(new ResGeneralDto(true));
        } else {
            throw new CustomException("Error in update :: " + id);
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> updateUseful(String id) throws CustomException {
        // Validation
        return ResponseEntity.ok().body(new ResGeneralDto(questionService.updateUseful(id)));
    }

    @Override
    public ResponseEntity<Page<Question>> search(String term, List<String> selectedTagList, Long totalElements, Pageable pageable, String liked) throws CustomException {
        return ResponseEntity.ok().body(questionService.search(term, selectedTagList, pageable, totalElements, liked));
    }

    @Override
    public ResponseEntity<Page<Question>> getMyPage(String term, Long totalElements, Pageable pageable) throws CustomException {
        return ResponseEntity.ok().body(questionService.getMyPage(term, pageable, totalElements));
    }
}