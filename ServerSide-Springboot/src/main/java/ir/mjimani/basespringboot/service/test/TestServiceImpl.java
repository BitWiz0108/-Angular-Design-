package ir.mjimani.basespringboot.service.test;

import ir.mjimani.basespringboot.dao.test.TestDao;
import ir.mjimani.basespringboot.domain.test.Test;
import ir.mjimani.basespringboot.exception.error.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

/**
 * @author Parvin at 2021-06-01
 * email: 
 * 
 * Spring service implementation for the Test entity.
 */
@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService {

    private final TestDao testDao;

    @Override
    public String create(Test test) throws CustomException {
        String result = testDao.create(test);
        if (result == null || result.isEmpty()) {
            throw new CustomException("Can not create", HttpStatus.OK);
        }
        return result;
    }
}
