package ir.mjimani.basespringboot.repository.test;

import ir.mjimani.basespringboot.domain.test.Test;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends CrudRepository<Test, String> {
}
