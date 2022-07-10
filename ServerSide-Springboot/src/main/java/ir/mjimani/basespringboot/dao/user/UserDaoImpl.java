package ir.mjimani.basespringboot.dao.user;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.stereotype.Repository;

import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.user.LightUser;
import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.tools.db.CommonQuery;
import ir.mjimani.basespringboot.tools.db.CustomMongoTemplate;

/**
 * @author MjImani at 2021-06-06
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring Data MongoDB dao implementation for the User entity.
 */
@Repository
public class UserDaoImpl extends CustomMongoTemplate<User> implements UserDao {

    public UserDaoImpl(MongoDatabaseFactory mongoDbFactory) {
        super(mongoDbFactory);
    }

    private final Class<User> entityClass = User.class;

    protected CommonQuery<User> entityQuery() {
        return super.mongoQuery(entityClass);
    }

    @Override
    public User findByUsername(String username) throws CustomException {
        return entityQuery()
                .is(User.FN.username, username)
                .findOne();
    }

    @Override
    public User findByPhone(String phone) throws CustomException {
        return entityQuery()
                .is(User.FN.phone, phone)
                .findOne();
    }

    @Override
    public User findByEmail(String email) throws CustomException {
        return entityQuery()
                .is(User.FN.email, email)
                .findOne();
    }

    @Override
    public Boolean emailExists(String email) throws CustomException {
        return entityQuery()
                .is(User.FN.email, email)
                .exists();
    }
    
    @Override
    public User incPoints(String id, Number num) throws CustomException {
    	return entityQuery()
        .isId(id)
        .inc(User.FN.points, num)
        .findAndModify();
    }

    @Override
    public Boolean createUser(User user) throws CustomException {
        user = save(user);
        if (user.getId() != null && !user.getId().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public User getOne(String id) throws CustomException {
        return entityQuery()
                .isId(id)
                .include(User.FN.displayName)
                .findOne();
    }

    @Override
    public Boolean displayNameExists(String displayName) throws CustomException {
        return entityQuery()
                .is(User.FN.displayName, displayName)
                .exists();
    }

    @Override
    public Boolean updatePassword(String email, String hashPassword) throws CustomException {
        return entityQuery()
                .is(User.FN.email, email)
                .set(User.FN.password, hashPassword)
                .set(User.FN.lastPasswordResetDate, new Date())
                .updateFirst();
    }

	@Override
	public Boolean updateActivateTags(String id, LightUser user) throws CustomException {
		return entityQuery()
                .isId(id)
                .set(Question.FN.tag, user.getActivatedTags())
                .set(Question.GFN.modifiedDate, new Date())
                .updateFirst();
	}
	
	@Override
	public List<User> tagsExists() throws CustomException {
		return entityQuery().exists(User.FN.tag, Boolean.TRUE).find();
	}
}
