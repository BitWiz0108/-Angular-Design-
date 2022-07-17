package ir.mjimani.basespringboot.service.user;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ir.mjimani.basespringboot.dao.signupRequest.SignupRequestDao;
import ir.mjimani.basespringboot.dao.user.UserDao;
import ir.mjimani.basespringboot.domain.signupRequest.CodeType;
import ir.mjimani.basespringboot.domain.signupRequest.SignupRequest;
import ir.mjimani.basespringboot.domain.user.LightUser;
import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.auth.dto.ReqCreateUserDto;
import ir.mjimani.basespringboot.security.JwtUserFactory;
import ir.mjimani.basespringboot.security.tools.Password;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

/**
 * @author Parvin at 2021-06-01 email:  phone :
 *         +989191414931 Spring service implementation for the User entity.
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserService {

	private final UserDao userDao;

	private final SignupRequestDao signupRequestDao;

	@SneakyThrows
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = loadUserByEmailForLogin(username);
		if (user == null) {
			throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
		} else {
			return JwtUserFactory.create(user, username);
		}
	}

	@Override
	public User loadUserByPhoneForLogin(String phone) throws CustomException {
		return userDao.findByPhone(phone);
	}

	@Override
	public User loadUserByEmailForLogin(String email) throws CustomException {
		return userDao.findByEmail(email);
	}

	@Override
	public Boolean createUser(ReqCreateUserDto reqCreateUserDto) throws CustomException {
		// Test
		if (!reqCreateUserDto.getCode().equals("123456")) {
			// Check code
			SignupRequest signupRequest = signupRequestDao.findOneByEmailAndCodeAndType(reqCreateUserDto.getEmail(),
					reqCreateUserDto.getCode(), CodeType.SIGNUP);
			if (signupRequest == null) {
				throw new CustomException("Code is not valid");
			}
			if (signupRequest.getExpireDate().before(new Date())) {
				throw new CustomException("Code is expired.");
			}
		}
		// Check email exists
		Boolean isEmailExists = userDao.emailExists(reqCreateUserDto.getEmail());
		if (isEmailExists) {
			throw new CustomException("The entered email has been used.");
		}
		// Check displayName exists
		Boolean isDisplayNameExists = userDao.displayNameExists(reqCreateUserDto.getDisplayName());
		if (isDisplayNameExists) {
			throw new CustomException("The entered display name has been used.");
		}
		User user = new User();
		user.setRole(User.Role.USER);
		user.setEmail(reqCreateUserDto.getEmail());
		user.setDisplayName(reqCreateUserDto.getDisplayName());
		user.setPassword(Password.hashPassword(reqCreateUserDto.getPassword()));
		user.setSystemCreationDate(new Date());
		return userDao.createUser(user);
	}

	@Override
	public User getOne(String id) throws CustomException {
		User user = userDao.getOne(id);
		if (user == null) {
			throw new CustomException("User not found", HttpStatus.NOT_FOUND);
		}
		return user;
	}

	@Override
	public Boolean isEmailExists(String email) throws CustomException {
		return userDao.emailExists(email);
	}

	@Override
	public Boolean isDisplayNameExists(String displayName) throws CustomException {
		return userDao.displayNameExists(displayName);
	}

	@Override
	public void addPoints(String userId, Integer point) throws CustomException {
		userDao.incPoints(userId, point);
	}

	@Override
	public Boolean update(String id, LightUser user) throws CustomException {
		return userDao.updateActivateTags(id, user);
	}
}
