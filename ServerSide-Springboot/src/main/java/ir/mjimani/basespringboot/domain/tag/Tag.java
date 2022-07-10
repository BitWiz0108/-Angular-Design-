package ir.mjimani.basespringboot.domain.tag;

import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = Tag.ENTITY_NAME)
public class Tag extends GeneralDomain {

    @Transient
    public final static String END_POINT = "tags";

    @Transient
    public final static String ENTITY_NAME = "tag";

    public enum FN {
        title, description, questionsCount
    }

    private String title;

    private String description;

    private Integer questionsCount;
}
