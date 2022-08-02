package ir.mjimani.basespringboot.dao.question;

import java.util.List;

import org.springframework.data.domain.Pageable;

import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.tag.Tag;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author Parvin at 2021-06-11
 * email: 
 * 
 * Spring Data MongoDB dao interface for the Question entity.
 */
public interface QuestionDao {

    String create(Question question) throws CustomException;

    Boolean update(String id, Question question) throws CustomException;

    Boolean delete(String id) throws CustomException;

    Question getOne(String id) throws CustomException;

    Question getOne(String id, Object... fields) throws CustomException;

    List<Question> getList(Object... fields) throws CustomException;

    List<Question> getListByTitle(String title) throws CustomException;

    Boolean isOpen(String id) throws CustomException;

    Question getOneForShow(String id) throws CustomException;

    Boolean updateBestAnswer(String id, String answerId);

    Boolean updateUseful(String id, String userId, int inc);

//    Page<Question> search(String term, Pageable pageable, Long totalElements, Object... fields);

    List<Question> search(List<String> tags, String term, String liked, Pageable pageable, Object... fields) throws CustomException;

    Long searchCount(String term, List<String> selectedTagList,String liked) throws CustomException;

    List<Question> getMyPage(String term, Pageable pageable, Object... fields) throws CustomException;

    Long getMyPageCount(String term) throws CustomException;

    List<Question> findAllByTags(List<String> tags) throws CustomException;

}
