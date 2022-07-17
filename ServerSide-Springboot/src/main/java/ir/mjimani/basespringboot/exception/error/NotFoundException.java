package ir.mjimani.basespringboot.exception.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

/**
 * @author Parvin at 2021-06-17
 * email: 
 * 
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NotFoundException extends Exception {

    private String message;

    private int statusNumber;

    public NotFoundException(String message) {
        this.message = message;
        this.statusNumber = 406;
    }

}
