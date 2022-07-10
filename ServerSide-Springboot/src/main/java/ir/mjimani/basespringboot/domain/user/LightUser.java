package ir.mjimani.basespringboot.domain.user;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.tag.Tag;
import lombok.Data;


/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
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
