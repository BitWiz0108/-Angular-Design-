package ir.mjimani.basespringboot.exception;

import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.exception.error.NotFoundException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
/**
 * @author Parvin at 2021-06-17
 * email: 
 * 
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        String error = "Malformed JSON request";
        return buildResponseEntity(new ApiError(error), HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError, HttpStatus httpStatus) {
        return new ResponseEntity<>(apiError, httpStatus);
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError apiError, int httpStatus) {
        return new ResponseEntity<>(apiError, HttpStatus.valueOf(httpStatus));
    }

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<Object> handleCustomException(CustomException ex) {
        ApiError apiError = new ApiError(ex.getMessage());
        if (ex.getStatus() == null) {
            return buildResponseEntity(apiError, ex.getStatusNumber());
        }
        return buildResponseEntity(apiError, ex.getStatus());
    }

    @ExceptionHandler(NotFoundException.class)
    protected ResponseEntity<Object> handleNotFoundException(NotFoundException ex) {
        ApiError apiError = new ApiError(ex.getMessage());
        return buildResponseEntity(apiError, ex.getStatusNumber());
    }

}