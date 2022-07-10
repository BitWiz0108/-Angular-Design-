package ir.mjimani.basespringboot.resource.test;

import ir.mjimani.basespringboot.domain.test.Test;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.service.test.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author MjImani at 2021-06-01
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring rest controller implementation for the Test entity.
 */
@RestController
@RequiredArgsConstructor
public class TestResourceImpl implements TestResource {

    private final TestService testService;

    @Override
    public ResponseEntity<String> create(Test test) throws CustomException {
        return ResponseEntity.ok(testService.create(test));
    }

    @Override
    public ResponseEntity<Boolean> update(String id, Test test) {
        return null;
    }

    @Override
    public ResponseEntity<Test> getOne(String id, List<String> fields) {
        return ResponseEntity.ok(new Test("25", "Hello World"));
    }

    @Override
    public ResponseEntity<List<Test>> getList(List<String> fields) {
        return null;
    }

//    @Override
//    public ResponseEntity<List<Test>> getList(String page, String size, String totalElement, List<String> fields) {
//        return null;
//    }

    @Override
    public ResponseEntity<Boolean> delete(String id) {
        return null;
    }

    @Override
    public ResponseEntity<?> getTest() {
        return null;
    }
}
