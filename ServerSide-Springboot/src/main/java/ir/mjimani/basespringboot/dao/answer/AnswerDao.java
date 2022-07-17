package ir.mjimani.basespringboot.dao.answer;

import java.util.List;

import org.springframework.data.domain.Pageable;

import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author Parvin at 2021-06-30
 * email: 
 * 
 * Spring Data MongoDB dao interface for the Answer in Question entity.
 */
public interface AnswerDao {

    Answer getOneAnswer(String id, String answerId) throws CustomException;

    Boolean createAnswer(String id, Answer answer) throws CustomException;

    Boolean updateAnswer(String id, String answerId, Answer answer);

    Boolean deleteAnswer(String id, String answerId) throws CustomException;

    Boolean updateBestAnswer(String id, String answerId);

    Boolean updateUsefulAnswer(String id, String answerId, String userId, int i);

    List<Question> getMyPage(String term, Pageable pageable, Object... fields) throws CustomException;

    Long getMyPageCount(String term) throws CustomException;

}
