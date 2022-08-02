package ir.mjimani.basespringboot.resource.test;

import ir.mjimani.basespringboot.domain.test.Test;
import ir.mjimani.basespringboot.exception.error.CustomException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Parvin at 2021-06-01
 * email: 
 * 
 * Spring rest controller interface for the Test entity.
 */
@RequestMapping("api/" + Test.ENTITY_NAME)
public interface TestResource {

    @PostMapping
    ResponseEntity<String> create(@RequestBody Test test) throws CustomException;

    @PutMapping("{id}")
    ResponseEntity<Boolean> update(@PathVariable String id, @RequestBody Test test);

    @GetMapping("{id}")
    ResponseEntity<Test> getOne(@PathVariable String id, @RequestParam("fields") List<String> fields);

    @GetMapping
    ResponseEntity<List<Test>> getList(@RequestParam("fields") List<String> fields);

//    @GetMapping
//    ResponseEntity<List<Test>> getList(@RequestParam("page") String page, @RequestParam("size") String size, @RequestParam("totalElement") String totalElement, @RequestParam("fields") List<String> fields);

    @DeleteMapping("{id}")
    ResponseEntity<Boolean> delete(@PathVariable String id);

    @DeleteMapping("test")
    ResponseEntity<?> getTest();


}
