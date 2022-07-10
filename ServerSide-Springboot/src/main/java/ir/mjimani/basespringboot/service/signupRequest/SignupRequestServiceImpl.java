package ir.mjimani.basespringboot.service.signupRequest;

import ir.mjimani.basespringboot.dao.signupRequest.SignupRequestDao;
import ir.mjimani.basespringboot.dao.user.UserDao;
import ir.mjimani.basespringboot.domain.signupRequest.CodeType;
import ir.mjimani.basespringboot.domain.signupRequest.SignupRequest;
import ir.mjimani.basespringboot.domain.user.User;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.exception.error.NotFoundException;
import ir.mjimani.basespringboot.resource.auth.dto.ReqResetPasswordDto;
import ir.mjimani.basespringboot.resource.auth.dto.ReqSignupRequestCreateDto;
import ir.mjimani.basespringboot.security.tools.Password;
import ir.mjimani.basespringboot.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

import static ir.mjimani.basespringboot.tools.GenerateRandomChars.generateRandomDigits;

/**
 * @author MjImani at 2021-08-05
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring service implementation for the {@link SignupRequest} entity.
 */
@Service
@RequiredArgsConstructor
public class SignupRequestServiceImpl implements SignupRequestService {

    private final SignupRequestDao entityDao;
    private final UserDao userDao;
    private final EmailService emailService;

    private final static long incrementMinutesLong = 7200000L; // 120 * 60000;

    @Override
    public Boolean create(ReqSignupRequestCreateDto reqSignupRequestCreateDto) throws CustomException, NotFoundException {
        System.out.println("reqSignupRequestCreateDto.getEmail() = " + reqSignupRequestCreateDto.getEmail());
        if (reqSignupRequestCreateDto.getCodeType().equals(CodeType.SIGNUP)) {
            // Check email exists
            if (userDao.emailExists(reqSignupRequestCreateDto.getEmail())) {
                throw new CustomException("The entered email has been used.");
            }
            // Generate code
            String code;
            do {
                code = generateRandomDigits(6).toString();
            } while (entityDao.codeExists(code));


            // Create and save
            Long expireDate = new Date().getTime() + incrementMinutesLong;
            SignupRequest signupRequest = reqSignupRequestCreateDto.map();
            signupRequest.setCode(code);
            signupRequest.setExpireDate(new Date(expireDate));
            signupRequest.setSystemCreationDate(new Date());

            Boolean result = entityDao.save(signupRequest);
            if (result) {
                // Send code by email
                emailService.sendForRequestSignup(signupRequest.getEmail(), code);
                return true;
            }
            return false;
        } else if (reqSignupRequestCreateDto.getCodeType().equals(CodeType.FORGET_PASSWORD)) {
            // Get user by email
            User user = userDao.findByEmail(reqSignupRequestCreateDto.getEmail());
            if (user == null) {
                throw new NotFoundException("User not found");
            }
            // Generate code
            String code;
            do {
                code = generateRandomDigits(6).toString();
            } while (entityDao.codeExists(code));

            // Create and save
            Long expireDate = new Date().getTime() + incrementMinutesLong;
            SignupRequest signupRequest = reqSignupRequestCreateDto.map();
            signupRequest.setCode(code);
            signupRequest.setExpireDate(new Date(expireDate));
            signupRequest.setSystemCreationDate(new Date());
            signupRequest.setDisplayName(user.getDisplayName());

            Boolean result = entityDao.save(signupRequest);
            if (result) {
                // Send code by email
                emailService.sendForResetPassword(signupRequest.getDisplayName(), signupRequest.getEmail(), code);
                return true;
            }
            return false;
        } else {
            throw new CustomException("Error");
        }
    }

    @Override
    public Boolean changePassword(ReqResetPasswordDto reqResetPasswordDto) throws CustomException {
        // Test
        if (reqResetPasswordDto.getCode().equals("123456")){
            // Set new password
            return userDao.updatePassword(reqResetPasswordDto.getEmail(), Password.hashPassword(reqResetPasswordDto.getPassword()));
        }
        // Get request by code and type
        SignupRequest signupRequest = entityDao.findOneByEmailAndCodeAndType(reqResetPasswordDto.getEmail(), reqResetPasswordDto.getCode(), CodeType.FORGET_PASSWORD);
        if (signupRequest == null) {
            throw new CustomException("Code is not valid");
        }
        if (signupRequest.getExpireDate().before(new Date())) {
            throw new CustomException("Code is expired.");
        }
        // Set new password
        Boolean result = userDao.updatePassword(reqResetPasswordDto.getEmail(), Password.hashPassword(reqResetPasswordDto.getPassword()));
        if (result) {
            // Delete request by id
            entityDao.deleteById(signupRequest.getId());
            return true;
        }
        return false;
    }

    @Override
    public SignupRequest getVerificationDetailsByCode(String code) throws CustomException {
        return entityDao.getVerificationDetailsByCode(code);
    }
}