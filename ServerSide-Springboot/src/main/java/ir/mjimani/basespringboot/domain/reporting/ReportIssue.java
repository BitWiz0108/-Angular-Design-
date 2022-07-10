package ir.mjimani.basespringboot.domain.reporting;

import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection =ReportIssue.ENTITY_NAME)
public class ReportIssue  extends GeneralDomain {

    @Transient
    public final static String END_POINT = "reportIssues";

    @Transient
    public final static String ENTITY_NAME = "reportIssue";

    public enum FN {
        issue, paperId, videoId , title ,tag, questionStatus, date ,seen ,usefulCount ,creatorDisplayName
    }

    private String questionStatus;

    private String date;

    @DBRef
    @Field("tag")
    private List<Tag> tagList;

    private String issue;

    private String paperId;

    private String videoId;

    private String title;

    private Integer seen = 0;

    private Integer usefulCount = 0;

    private String creatorDisplayName;

}
