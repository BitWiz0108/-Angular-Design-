package ir.mjimani.basespringboot.dao.signupRequest;

import ir.mjimani.basespringboot.domain.signupRequest.CodeType;
import ir.mjimani.basespringboot.domain.signupRequest.SignupRequest;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.tools.db.CommonQuery;
import ir.mjimani.basespringboot.tools.db.CustomMongoTemplate;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.stereotype.Repository;

import java.util.Date;

/**
 * @author MjImani at 2021-08-05
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring Data MongoDB dao interface for the {@link SignupRequest} entity.
 */
@Repository
public class SignupRequestDaoImpl extends CustomMongoTemplate<SignupRequest> implements SignupRequestDao {

    public SignupRequestDaoImpl(MongoDatabaseFactory mongoDbFactory) {
        super(mongoDbFactory);
    }

    private final Class<SignupRequest> entityClass = SignupRequest.class;

    protected CommonQuery<SignupRequest> entityQuery() {
        return super.mongoQuery(entityClass);
    }

    @Override
    public Boolean save(SignupRequest signupRequest) throws CustomException {
        signupRequest = super.save(signupRequest);
        if (signupRequest.getId() != null) {
            return true;
        }
        return false;
    }

    @Override
    public Boolean codeExists(String code) throws CustomException {
        return entityQuery()
                .is(SignupRequest.FN.code, code)
                .exists();
    }

    @Override
    public SignupRequest findOneByEmailAndCodeAndType(String email, String code, CodeType codeType) throws CustomException {
        return entityQuery()
                .is(SignupRequest.FN.email, email)
                .is(SignupRequest.FN.code, code)
                .is(SignupRequest.FN.codeType, codeType)
                .findOne();
    }

    @Override
    public SignupRequest getVerificationDetailsByCode(String code) throws CustomException {
        return entityQuery()
                .is(SignupRequest.FN.code, code)
                .gt(SignupRequest.FN.expireDate, new Date())
                .findOne();
    }

    @Override
    public Boolean deleteById(String id) throws CustomException {
        return entityQuery()
                .isId(id)
                .delete();
    }
}

