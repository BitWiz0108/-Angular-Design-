package ir.mjimani.basespringboot.resource.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ir.mjimani.basespringboot.domain.user.LightUser;
import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;

/**
 * @author MjImani at 2021-06-06
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring rest controller interface for the User entity.
 */
@RequestMapping("api/users")
public interface UserResource {

    @GetMapping("{id}")
    ResponseEntity<User> getProfile(@PathVariable String id) throws CustomException;

    @GetMapping("check-email-exists")
    ResponseEntity<Boolean> isEmailExists(@RequestParam("email") String email) throws CustomException;

    @GetMapping("check-displayName-exists")
    ResponseEntity<Boolean> isDisplayNameExists(@RequestParam("displayName") String displayName) throws CustomException;
    
    @PutMapping("{id}")
    ResponseEntity<ResGeneralDto> update(@PathVariable String id, @RequestBody LightUser user) throws CustomException;

}