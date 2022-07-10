package ir.mjimani.basespringboot.domain.uploadPresentation;

import ir.mjimani.basespringboot.domain.tag.Tag;
import ir.mjimani.basespringboot.exception.error.CustomException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UploadPresentation {

    @Transient
    public final static String END_POINT = "uploadPresentations";

    @Transient
    public final static String ENTITY_NAME = "uploadPresentation";

    public enum FN {
        title, body, name, yearOfPaper, firstAuthorName, authorCheck, presentationLink, uploadAPresentation, creatorDisplayName
    }


    private String title;

    private String body;

    private String name;

    private String yearOfPaper;

    private String firstAuthorName;

    private Boolean authorCheck;

    private String presentationLink;

    private String uploadAPresentation;

    private String creatorDisplayName;

    @DBRef
    @Field("tag")
    private List<Tag> tagList;

    public void validation() throws CustomException {
        if (presentationLink != null && !presentationLink.isEmpty()) {
            if (!presentationLink.startsWith("https://www.youtube-nocookie")) {
                throw new CustomException("video link is not valid", 407);
            }
        }

    }

}
