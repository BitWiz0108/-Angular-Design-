package ir.mjimani.basespringboot.domain.general;


import com.fasterxml.jackson.annotation.JsonInclude;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


/**
 * @author Parvin at 2021-06-17
 * email: 
 * 
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GeneralDomain {

    public enum GFN {
        _id, id, creatorId, systemCreationDate, modifiedDate
    }

    @Id
    protected String id;

    @Indexed
    protected String creatorId;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    protected Date systemCreationDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    protected Date modifiedDate;

    public void initToSave() {
        creatorId = SecurityUtils.getLoggedInUserId();
        systemCreationDate = new Date();
    }

}
