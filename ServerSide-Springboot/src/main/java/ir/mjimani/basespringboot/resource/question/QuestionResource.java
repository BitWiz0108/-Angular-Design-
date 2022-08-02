package ir.mjimani.basespringboot.resource.question;

import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Parvin at 2021-06-11
 * email: 
 * 
 * Spring rest controller interface for the Question entity.
 */
@RequestMapping("api/" + Question.END_POINT)
public interface QuestionResource {

    @PostMapping()
    ResponseEntity<ResGeneralDto> create(@RequestBody Question question) throws CustomException;

    @PutMapping("{id}")
    ResponseEntity<ResGeneralDto> update(@PathVariable String id, @RequestBody Question question) throws CustomException;

    @DeleteMapping("{id}")
    ResponseEntity<ResGeneralDto> delete(@PathVariable String id) throws CustomException;

    @GetMapping("{id}")
    ResponseEntity<Question> getOne(@PathVariable String id) throws CustomException;

    @GetMapping()
    ResponseEntity<List<Question>> getList() throws CustomException;

    @PostMapping("title-search")
    ResponseEntity<List<Question>> getListByTitle(@RequestBody String title) throws CustomException;

    @GetMapping("for-show/{id}")
    ResponseEntity<Question> getOneForShow(@PathVariable String id) throws CustomException;

    @GetMapping("update-best-answer/{id}")
    ResponseEntity<ResGeneralDto> updateBestAnswer(@PathVariable String id,
                                                   @RequestParam("answerId") String answerId) throws CustomException;

    @GetMapping("update-useful-count/{id}")
    ResponseEntity<ResGeneralDto> updateUseful(@PathVariable String id) throws CustomException;

    @GetMapping("search")
    ResponseEntity<Page<Question>> search(
            @RequestParam(value = "term", required = false, defaultValue = "") String term,
            @RequestParam(value = "selectedTagList", required = false) List<String> selectedTagList,
            @RequestParam(value = "totalElements", required = false) Long totalElements, Pageable pageable,
            @RequestParam(value = "liked", required = false) String liked)
            throws CustomException;

    @GetMapping("get-my-page")
    ResponseEntity<Page<Question>> getMyPage(@RequestParam(value = "term", required = false, defaultValue = "") String term,
                                             @RequestParam(value = "totalElements", required = false) Long totalElements,
                                             Pageable pageable) throws CustomException;

}