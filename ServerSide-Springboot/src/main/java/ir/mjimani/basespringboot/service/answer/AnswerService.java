package ir.mjimani.basespringboot.service.answer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author Parvin at 2021-06-17
 * email: 
 * 
 * Spring service interface for the Answer entity.
 */
public interface AnswerService {

    Answer create(String questionId, Answer answer) throws CustomException;

    Boolean update(String id, String questionId, Answer answer) throws CustomException;

    Boolean delete(String id, String questionId) throws CustomException;

    Boolean updateUseful(String id, String questionId) throws CustomException;

    Page<Question> getMyPage(String term, Long totalElements, Pageable pageable) throws CustomException;

}