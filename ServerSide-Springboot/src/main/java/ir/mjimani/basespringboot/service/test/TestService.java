package ir.mjimani.basespringboot.service.test;

import ir.mjimani.basespringboot.domain.test.Test;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author MjImani at 2021-06-01
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring service interface for the Test entity.
 */
public interface TestService {

    String create(Test test) throws CustomException;
}
