package ir.mjimani.basespringboot.domain.answer;

import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.exception.error.CustomException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Transient;

import java.util.Set;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Answer extends GeneralDomain {

    @Transient
    public final static String END_POINT = "answers";

    @Transient
    public final static String ENTITY_NAME = "answers";

    public enum FN {
        body, isBestAnswer, usefulCount, participatingIdList, videoLink, creatorDisplayName, authorCheck, bugReport
    }

    private String body;

    private Boolean isBestAnswer = false;

    private Integer usefulCount;

    private Set<String> participatingIdList;

    private String videoLink;

    private String uploadedPresentation;

    private String creatorDisplayName;

    private Boolean authorCheck;

    private String bugReport;

    public void validation() throws CustomException {
        if (videoLink != null && !videoLink.isEmpty()) {
            if (!videoLink.startsWith("https://www.youtube-nocookie")) {
                throw new CustomException("video link is not valid", 407);
            }
        }

    }
}

