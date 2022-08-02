package ir.mjimani.basespringboot.service.user;

import ir.mjimani.basespringboot.domain.user.LightUser;
import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.auth.dto.ReqCreateUserDto;

/**
 * @author Parvin at 2021-06-06
 * email: 
 * 
 * Spring service interface for the User entity.
 */
public interface UserService {

    User loadUserByPhoneForLogin(String phone) throws CustomException;

    User loadUserByEmailForLogin(String email) throws CustomException;

    Boolean createUser(ReqCreateUserDto reqCreateUserDto) throws CustomException;

    User getOne(String id) throws CustomException;

    Boolean isEmailExists(String email) throws CustomException;

    Boolean isDisplayNameExists(String displayName) throws CustomException;

	void addPoints(String userId, Integer point) throws CustomException;

	Boolean update(String id, LightUser user) throws CustomException;
}