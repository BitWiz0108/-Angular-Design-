package ir.mjimani.basespringboot.domain.question;

import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.comment.Comment;
import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.TextScore;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author Parvin at 2021-06-17
 * email: 
 * 
 */
    @Setter
    @Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = Question.ENTITY_NAME)
public class Question extends GeneralDomain {

    @Transient
    public final static String END_POINT = "questions";

    @Transient
    public final static String ENTITY_NAME = "question";

    public enum FN {
        questionStatus, title, body, name, year, firstAuthorName, creatorDisplayName, tag, answerList, commentList, answerId, usefulCount, participatingIdList, seen, answersCount, votesCount
    }

    public enum QuestionStatus {
        NOPRESENTATIONYET, WITHPRESENTATION, CLOSED
    }

    private QuestionStatus questionStatus = QuestionStatus.NOPRESENTATIONYET;

    @TextIndexed(weight = 5)
    private String title;

    @TextScore
    private Float score;

    private String body;

    private String name;

    private String year;

    private String firstAuthorName;

    private String creatorDisplayName;

    @DBRef
    @Field("tag")
    private List<Tag> tagList;

    private List<Answer> answerList = new ArrayList<>();

    private List<Comment> commentList = new ArrayList<>();

    private String answerId;

    private Integer usefulCount = 0;

    private Set<String> participatingIdList;

    private Integer seen = 0;

    private Integer answersCount = 0;

    private Integer votesCount = 0;

}
