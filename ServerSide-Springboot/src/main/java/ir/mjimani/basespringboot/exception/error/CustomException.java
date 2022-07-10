package ir.mjimani.basespringboot.exception.error;

import com.fasterxml.jackson.annotation.JsonInclude;
//import jdk.net.SocketFlow;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomException extends Exception {

    private String message;

    private HttpStatus status;

    private int statusNumber;

    public CustomException(String message) {
        this.message = message;
        status = HttpStatus.BAD_REQUEST;
    }

    public CustomException(String message, int statusNumber) {
        this.message = message;
        this.statusNumber = statusNumber;
    }

    public CustomException(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }

}
