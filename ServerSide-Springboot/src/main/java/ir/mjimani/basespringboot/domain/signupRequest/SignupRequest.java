package ir.mjimani.basespringboot.domain.signupRequest;

import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.question.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = SignupRequest.ENTITY_NAME)
public class SignupRequest extends GeneralDomain {

    @Transient
    public final static String ENTITY_NAME = "signupRequest";

    public enum FN {
        email, code, codeType, expireDate
    }

    private String email;

    private String code;

    private CodeType codeType;

    private Date expireDate;

    private String displayName;

}
