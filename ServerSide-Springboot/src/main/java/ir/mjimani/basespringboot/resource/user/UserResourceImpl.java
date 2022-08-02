package ir.mjimani.basespringboot.resource.user;

import ir.mjimani.basespringboot.domain.user.LightUser;
import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import ir.mjimani.basespringboot.service.user.UserService;
import ir.mjimani.basespringboot.tools.validation.ValidationTools;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Parvin at 2021-06-06
 * email: 
 * 
 * Spring rest controller implementation for the User entity.
 */
@RestController
@RequiredArgsConstructor
public class UserResourceImpl implements UserResource {

    private final UserService userService;

    @Override
    public ResponseEntity<User> getProfile(String id) throws CustomException {
        return ResponseEntity.ok(userService.getOne(id));
    }

    @Override
    public ResponseEntity<Boolean> isEmailExists(String email) throws CustomException {
        ValidationTools.emailValidation(email);
        return ResponseEntity.ok(userService.isEmailExists(email));
    }

    @Override
    public ResponseEntity<Boolean> isDisplayNameExists(String displayName) throws CustomException {
        ValidationTools.displayNameValidation(displayName);
        return ResponseEntity.ok(userService.isDisplayNameExists(displayName));
    }

	@Override
	public ResponseEntity<ResGeneralDto> update(String id, LightUser user) throws CustomException {
		ValidationTools.idValidation(id);
		Boolean result = userService.update(id, user);
		if (result != null && result) {
			return ResponseEntity.ok().body(new ResGeneralDto(true));
		} else {
			throw new CustomException("Error in update :: " + id);
		}
	}
}