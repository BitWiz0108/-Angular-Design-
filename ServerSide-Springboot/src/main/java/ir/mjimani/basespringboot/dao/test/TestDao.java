package ir.mjimani.basespringboot.dao.test;

import ir.mjimani.basespringboot.domain.test.Test;

/**
 * @author MjImani at 2021-06-01
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring Data MongoDB dao interface for the Test entity.
 */
public interface TestDao {

    String create(Test test);
}
