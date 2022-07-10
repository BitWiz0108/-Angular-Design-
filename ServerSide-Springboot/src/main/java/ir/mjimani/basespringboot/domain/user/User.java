package ir.mjimani.basespringboot.domain.user;


import com.fasterxml.jackson.annotation.JsonInclude;
import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = User.ENTITY_NAME)
public class User extends GeneralDomain {

    private static final long serialVersionUID = -3382883434075858422L;

    @Transient
    public final static String END_POINT = "users";

    @Transient
    public final static String ENTITY_NAME = "user";

    public enum FN {
        displayName, email, phone, username, password, lastPasswordResetDate, points, tag
    }

    public enum Role {
        ADMIN, USER
    }

    private Role role;

    @Indexed(unique = true)
    private String displayName;

    private String fullName;

    private String photo;

    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true, sparse = true)
    private String phone;

    @Indexed(unique = true, sparse = true)
    private String username;

    private String password;

    private Date lastPasswordResetDate;

    private Boolean enabled = true;
    
    private Integer points = 0;
    
    @DBRef
    @Field("tag")
    private List<Tag> activatedTags;


}
