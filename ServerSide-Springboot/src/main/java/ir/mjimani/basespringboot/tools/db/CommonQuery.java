package ir.mjimani.basespringboot.tools.db;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.MongoDatabaseFactory;

import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.tag.Tag;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import lombok.Getter;
import lombok.Setter;

/**
 * I write common query into this class for increasing reusability of code.
 *
 * @param <T>
 * @author yaqub
 */
@Getter
@Setter
public class CommonQuery<T> extends BasicQuery<T> {

    public CommonQuery(MongoDatabaseFactory mongoDbFactory) {
        super(mongoDbFactory);
    }

    public CommonQuery<T> isId(String id) {
        is(GeneralDomain.GFN.id.name(), id);
        return this;
    }

    public CommonQuery<T> isCreator() {
        is(GeneralDomain.GFN.creatorId.name(), SecurityUtils.getLoggedInUserId());
        return this;
    }

    public CommonQuery<T> isAnswerCreator() {
        is(Question.FN.answerList + "." + GeneralDomain.GFN.creatorId, SecurityUtils.getLoggedInUserId());
        return this;
    }

    public CommonQuery<T> sortSystemCreationDateDESC() {
        super.withSort(GeneralDomain.GFN.systemCreationDate, Sort.Direction.DESC); //
        return this;
    }

    public CommonQuery<T> isTagElementMatching(List<ObjectId> objectIds) {
        super.elementMatching(Tag.ENTITY_NAME, Tag.ENTITY_NAME + ".$id", 2, objectIds);
        return this;
    }

    public CommonQuery<T> sortUsefulCountDesc() {
        super.withSort(Question.FN.usefulCount, Sort.Direction.DESC);
        return this;
    }
}
