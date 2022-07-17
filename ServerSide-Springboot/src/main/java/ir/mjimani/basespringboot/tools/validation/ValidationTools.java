package ir.mjimani.basespringboot.tools.validation;

import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author Parvin at 2021-08-05
 * email: 
 * 
 * Pattern list.
 */
public class ValidationTools {

    public static void idValidation(String id) throws CustomException {
        if (!PatternValidation.objectId(id))
            throw new CustomException("Id is not valid.");
    }

    public static void passwordValidation(String password) throws CustomException {
        if (password == null || password.isEmpty()) {
            throw new CustomException("Password can not be empty.");
        }
        if (!PatternValidation.password(password)) {
            throw new CustomException("Password is not valid.");
        }
    }

    public static void emailValidation(String email) throws CustomException {
        if (email == null || email.isEmpty()) {
            throw new CustomException("Email can not be empty!");
        }
        if (!PatternValidation.email(email)) {
            throw new CustomException("Email is not valid.");
        }
    }

    public static void nullStringFieldValidation(String s, String fieldName) throws CustomException {
        if (s == null || s.isEmpty()) {
            throw new CustomException(fieldName + " can not be empty.");
        }
    }

    public static void displayNameValidation(String displayName) throws CustomException {
        if (displayName == null || displayName.isEmpty()) {
            throw new CustomException("Display name can not be empty.");
        }
        if (!PatternValidation.displayName(displayName)) {
            throw new CustomException("Display name is not valid.");
        }
    }
}
