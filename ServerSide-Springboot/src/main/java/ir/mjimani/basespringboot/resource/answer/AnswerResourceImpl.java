package ir.mjimani.basespringboot.resource.answer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import ir.mjimani.basespringboot.service.answer.AnswerService;
import ir.mjimani.basespringboot.service.question.QuestionService;
import ir.mjimani.basespringboot.service.user.UserService;
import ir.mjimani.basespringboot.service.user.point.UserPoint;
import lombok.RequiredArgsConstructor;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring rest controller implementation for the Answer entity.
 */
@RestController
@RequiredArgsConstructor
public class AnswerResourceImpl implements AnswerResource {

    private final AnswerService entityService;
    private final UserService userService;
    private final QuestionService questionService;

    @Override
    public ResponseEntity<Answer> create(String questionId, Answer answer) throws CustomException {
        answer.validation();
        answer = entityService.create(questionId, answer);
        if (answer != null) {
	        userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.ANSWER_POINTS.getValue());	
            return ResponseEntity.ok().body(answer);
        } else {
            throw new CustomException("Error in create answer :: ", 407);
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> update(String id, String questionId, Answer answer) throws CustomException {
        answer.validation();
        Boolean result = entityService.update(id, questionId, answer);
        if (result != null && result) {
            return ResponseEntity.ok().body(new ResGeneralDto(true));
        } else {
            throw new CustomException("Error in update :: ", 407);
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> delete(String id, String questionId) throws CustomException {
        // Validation

        Boolean result = entityService.delete(id, questionId);
        if (result != null && result) {
            return ResponseEntity.ok().body(new ResGeneralDto(true));
        } else {
            throw new CustomException("Error in delete :: " + id, 407);
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> updateUseful(String id, String questionId) throws CustomException {
        // Validation
        Boolean updateUseful = entityService.updateUseful(id, questionId);
        
        if(updateUseful) {
        	Question question = questionService.getOne(questionId, Question.GFN.creatorId);
			userService.addPoints(question.getCreatorId(), UserPoint.USEFUL_QUE_POINTS.getValue());
        }
		return ResponseEntity.ok().body(new ResGeneralDto(updateUseful));
    }

    @Override
    public ResponseEntity<Page<Question>> getMyPage(String term, Long totalElements, Pageable pageable) throws CustomException {
        return ResponseEntity.ok().body(entityService.getMyPage(term, totalElements,pageable));
    }
}