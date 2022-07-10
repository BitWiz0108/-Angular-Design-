package ir.mjimani.basespringboot.service.question;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author MjImani at 2021-06-11
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring service interface for the Question entity.
 */
public interface QuestionService {

    String create(Question question) throws CustomException;

    Boolean update(String id, Question question) throws CustomException;

    Boolean delete(String id) throws CustomException;

    Question getOne(String id) throws CustomException;

    List<Question> getList() throws CustomException;

    List<Question> getListByTitle(String title) throws CustomException;

    Question getOneForShow(String id) throws CustomException;

    Question updateBestAnswer(String id, String answerId) throws CustomException;

    Boolean updateUseful(String id) throws CustomException;

    Page<Question> search(String term, List<String> selectedTagList, Pageable pageable, Long totalElements, String liked) throws CustomException;

    Page<Question> getMyPage(String term, Pageable pageable, Long totalElements) throws CustomException;

	Question getOne(String questionId, Object... creatorid) throws CustomException;
}