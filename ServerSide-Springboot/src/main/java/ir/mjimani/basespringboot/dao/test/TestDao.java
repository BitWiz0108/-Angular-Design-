package ir.mjimani.basespringboot.dao.test;

import ir.mjimani.basespringboot.domain.test.Test;

/**
 * @author Parvin at 2021-06-01
 * email: 
 * 
 * Spring Data MongoDB dao interface for the Test entity.
 */
public interface TestDao {

    String create(Test test);
}
