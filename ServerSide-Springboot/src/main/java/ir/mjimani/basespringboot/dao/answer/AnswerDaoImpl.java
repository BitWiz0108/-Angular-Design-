package ir.mjimani.basespringboot.dao.answer;

import java.util.Collections;
import java.util.List;

import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import com.mongodb.BasicDBObject;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;

import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.tools.db.CommonQuery;
import ir.mjimani.basespringboot.tools.db.CustomMongoTemplate;

/**
 * @author Parvin at 2021-06-30
 * email: 
 * 
 * Spring Data MongoDB dao interface for the Answer in Question entity.
 */
@Repository
public class AnswerDaoImpl extends CustomMongoTemplate<Question> implements AnswerDao {

    public AnswerDaoImpl(MongoDatabaseFactory mongoDbFactory) {
        super(mongoDbFactory);
    }

    private final Class<Question> entityClass = Question.class;

    private String entityName = Question.ENTITY_NAME;

    protected CommonQuery<Question> entityQuery() {
        return super.mongoQuery(entityClass);
    }

    @Override
    public Answer getOneAnswer(String id, String answerId) throws CustomException {
        try {
            Aggregation aggregation = Aggregation.newAggregation(
                    Aggregation.match(Criteria.where(GeneralDomain.GFN.id.name()).is(id)),
                    Aggregation.unwind(Question.FN.answerList.name()),
                    Aggregation.replaceRoot(Question.FN.answerList.name()),
                    Aggregation.match(Criteria.where(GeneralDomain.GFN._id.name()).is(new ObjectId(answerId))),
                    Aggregation.project(Answer.GFN.id.name(), Answer.FN.participatingIdList.name())
            );
            return aggregate(aggregation, entityClass, Answer.class).getUniqueMappedResult();
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Boolean createAnswer(String id, Answer answer) throws CustomException {
        return entityQuery()
                .isId(id)
                .push(Question.FN.answerList, answer)
                .inc(Question.FN.answersCount, 1)
                .updateFirst();
    }

    @Override
    public Boolean updateAnswer(String id, String answerId, Answer answer) {
        try {
            Bson filter = Filters.eq(Answer.GFN._id.name(), new ObjectId(id));

            UpdateOptions updateOptions = new UpdateOptions().arrayFilters(Collections.singletonList(
                    Filters.eq("al." + Answer.GFN._id.name(), new ObjectId(answerId))
                    )
            );

            Bson bson = Updates.combine(
                    Updates.set(Question.FN.answerList.name() + ".$[al]." + Answer.FN.body.name(), answer.getBody()),
                    Updates.set(Question.FN.answerList.name() + ".$[al]." + Answer.FN.videoLink.name(), answer.getVideoLink())
            );

            UpdateResult result = getCollection(entityName).updateOne(filter, bson, updateOptions);
            if (result.getModifiedCount() > 0)
                return true;
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean deleteAnswer(String id, String answerId) throws CustomException {
        return entityQuery()
                .isId(id)
                .pull(Question.FN.answerList, new BasicDBObject(GeneralDomain.GFN._id.name(), new ObjectId(answerId)))
                .inc(Question.FN.answersCount, -1)
                .updateFirst();
    }

    @Override
    public Boolean updateBestAnswer(String id, String answerId) {
        try {
            Bson filter = Filters.eq(Question.GFN._id.name(), new ObjectId(id));

            UpdateOptions updateOptions = new UpdateOptions().arrayFilters(Collections.singletonList(
                    Filters.eq("al." + Answer.GFN._id.name(), new ObjectId(answerId))
                    )
            );

            Bson bson = Updates.combine(
                    Updates.set(Question.FN.questionStatus.name(), Question.QuestionStatus.WITHPRESENTATION),
                    Updates.set(Question.FN.answerId.name(), answerId),
                    Updates.set(Question.FN.answerList.name() + ".$[al]." + Answer.FN.isBestAnswer.name(), true)
            );

            UpdateResult result = getCollection(entityName).updateOne(filter, bson, updateOptions);
            if (result.getModifiedCount() > 0)
                return true;
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean updateUsefulAnswer(String id, String answerId, String userId, int inc) {
        try {
            Bson filter = Filters.eq(Question.GFN._id.name(), new ObjectId(id));

            UpdateOptions updateOptions = new UpdateOptions().arrayFilters(Collections.singletonList(
                    Filters.eq("al." + Answer.GFN._id.name(), new ObjectId(answerId))
                    )
            );
            Bson updateUser;
            if (inc > 0) {
                updateUser = Updates.push(Question.FN.answerList.name() + ".$[al]." + Answer.FN.participatingIdList.name(), userId);
            } else {
                updateUser = Updates.pull(Question.FN.answerList.name() + ".$[al]." + Answer.FN.participatingIdList.name(), userId);
            }

            Bson bson = Updates.combine(
                    updateUser,
                    Updates.inc(Question.FN.answerList.name() + ".$[al]." + Answer.FN.usefulCount.name(), inc)
            );

            UpdateResult result = getCollection(entityName).updateOne(filter, bson, updateOptions);
            if (result.getModifiedCount() > 0)
                return true;
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Question> getMyPage(String term, Pageable pageable, Object... fields) throws CustomException {
        if (term != null && !term.isEmpty()) {
            return entityQuery()
                    .regex(Question.FN.title ,term)
                    .isAnswerCreator()
                    .with(pageable)
                    .include(fields)
                    .sortSystemCreationDateDESC()
                    .find();
        } else {
            return entityQuery()
                    .isAnswerCreator()
                    .with(pageable)
                    .include(fields)
                    .sortSystemCreationDateDESC()
                    .find();
        }
    }

    @Override
    public Long getMyPageCount(String term) throws CustomException {
        if (term != null && !term.isEmpty()) {
            return entityQuery()
                    .regex(Question.FN.title ,term)
                    .isAnswerCreator()
                    .count();
        } else {
            return entityQuery()
                    .isAnswerCreator()
                    .count();
        }
    }

}
