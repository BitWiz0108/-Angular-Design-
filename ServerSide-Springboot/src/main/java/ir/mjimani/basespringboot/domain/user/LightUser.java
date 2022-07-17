package ir.mjimani.basespringboot.domain.user;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.tag.Tag;
import lombok.Data;


/**
 * @author Parvin at 2021-06-17
 * email: 
 * 
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LightUser extends GeneralDomain {

    private User.Role role;

    private String displayName;

    private String email;

    private Integer points;
    
    private List<Tag> activatedTags;
}
