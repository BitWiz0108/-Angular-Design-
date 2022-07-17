package ir.mjimani.basespringboot.resource.answer;

import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Parvin at 2021-06-17
 * email: 
 * 
 * Spring rest controller interface for the Answer entity.
 */
@RequestMapping("api/" + Answer.END_POINT)
public interface AnswerResource {

    @PostMapping()
    ResponseEntity<Answer> create(@RequestParam("questionId") String questionId, @RequestBody Answer answer) throws CustomException;

    @PutMapping("{id}")
    ResponseEntity<ResGeneralDto> update(@PathVariable String id, @RequestParam("questionId") String questionId, @RequestBody Answer answer) throws CustomException;

    @DeleteMapping("{id}")
    ResponseEntity<ResGeneralDto> delete(@PathVariable String id, @RequestParam("questionId") String questionId) throws CustomException;

    @GetMapping("update-useful-count/{id}")
    ResponseEntity<ResGeneralDto> updateUseful(@PathVariable String id, @RequestParam("questionId") String questionId) throws CustomException;

    @GetMapping("get-my-page")
    ResponseEntity<Page<Question>> getMyPage(@RequestParam(value = "term", required = false, defaultValue = "") String term,
                                          @RequestParam(value = "totalElements", required = false) Long totalElements,
                                          Pageable pageable) throws CustomException;
}