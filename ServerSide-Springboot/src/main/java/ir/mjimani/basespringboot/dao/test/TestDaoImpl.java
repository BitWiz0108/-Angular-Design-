package ir.mjimani.basespringboot.dao.test;

import ir.mjimani.basespringboot.domain.test.Test;
import ir.mjimani.basespringboot.repository.test.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

/**
 * @author MjImani at 2021-06-01
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring Data MongoDB dao implementation for the Test entity.
 */
@Repository
public class TestDaoImpl implements TestDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private TestRepository testRepository;

    @Override
    public String create(Test test) {
        try {
            testRepository.save(test);
            return "25";
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
