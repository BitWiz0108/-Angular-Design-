package ir.mjimani.basespringboot.dao.user;

import java.util.List;

import ir.mjimani.basespringboot.domain.user.LightUser;
import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author Parvin at 2021-06-06
 * email: 
 * 
 * Spring Data MongoDB dao interface for the User entity.
 */
public interface UserDao {

    User findByUsername(String username) throws CustomException;

    User findByPhone(String phone) throws CustomException;

    User findByEmail(String email) throws CustomException;

    Boolean emailExists(String email) throws CustomException;

    Boolean createUser(User user) throws CustomException;

    User getOne(String id) throws CustomException;

    Boolean displayNameExists(String displayName) throws CustomException;

    Boolean updatePassword(String email, String hashPassword) throws CustomException;

	User incPoints(String id, Number num) throws CustomException;

	Boolean updateActivateTags(String id, LightUser user) throws CustomException;

	List<User> tagsExists() throws CustomException;
}
