package ir.mjimani.basespringboot.dao.question;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mongodb.client.model.Filters;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;

import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.tools.db.CommonQuery;
import ir.mjimani.basespringboot.tools.db.CustomMongoTemplate;

/**
 * @author MjImani at 2021-06-11
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring Data MongoDB dao interface for the Question entity.
 */
@Repository
public class QuestionDaoImpl extends CustomMongoTemplate<Question> implements QuestionDao {

    public QuestionDaoImpl(MongoDatabaseFactory mongoDbFactory) {
        super(mongoDbFactory);
    }

    private final Class<Question> entityClass = Question.class;

    private String entityName = Question.ENTITY_NAME;

    protected CommonQuery<Question> entityQuery() {
        return super.mongoQuery(entityClass);
    }

    @Override
    public String create(Question question) throws CustomException {
        question = save(question);
        if (question.getId() != null) {
            return question.getId();
        }
        return "";
    }

    @Override
    public Boolean update(String id, Question question) throws CustomException {
        return entityQuery().isId(id).set(Question.FN.title, question.getTitle()).set(Question.FN.body, question.getBody()).set(Question.FN.tag, question.getTagList()).set(Question.FN.name, question.getName()).set(Question.FN.year, question.getYear()).set(Question.FN.firstAuthorName, question.getFirstAuthorName()).set(Question.GFN.modifiedDate, new Date()).set(Question.FN.questionStatus, question.getQuestionStatus()).updateFirst();
    }

    @Override
    public Boolean delete(String id) throws CustomException {
//        Query query;
//        query.with()
        return entityQuery().isId(id).isCreator().delete();
    }

    @Override
    public Question getOne(String id) throws CustomException {
        return entityQuery().isId(id).findOne();
    }

    @Override
    public Question getOne(String id, Object... fields) throws CustomException {
        return entityQuery().isId(id).include(fields).findOne();
    }

    @Override
    public List<Question> getList(Object... fields) throws CustomException {
        return entityQuery().include(fields).find();
    }

    @Override
    public List<Question> getListByTitle(String title) throws CustomException {
        return entityQuery().regex(Question.FN.title , title).find();
    }

    @Override
    public Boolean isOpen(String id) throws CustomException {
        return entityQuery().isId(id).is(Question.FN.questionStatus, Question.QuestionStatus.NOPRESENTATIONYET.name()).exists();
    }

    @Override
    public Question getOneForShow(String id) throws CustomException {
        return entityQuery().isId(id).inc(Question.FN.seen, 1).findAndModify();
    }

    @Override
    public Boolean updateBestAnswer(String id, String answerId) {
        try {
            Bson filter = Filters.eq(Question.GFN._id.name(), new ObjectId(id));

            UpdateOptions updateOptions = new UpdateOptions().arrayFilters(Collections.singletonList(Filters.eq("al." + Answer.GFN._id.name(), new ObjectId(answerId))));

            Bson bson = Updates.combine(Updates.set(Question.FN.questionStatus.name(), Question.QuestionStatus.WITHPRESENTATION.name()), Updates.set(Question.FN.answerId.name(), answerId), Updates.set(Question.FN.answerList.name() + ".$[al]." + Answer.FN.isBestAnswer.name(), true));

            UpdateResult result = getCollection(entityName).updateOne(filter, bson, updateOptions);
            if (result.getModifiedCount() > 0) return true;
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean updateUseful(String id, String userId, int inc) {
        try {
            Bson filter = Filters.eq(Question.GFN._id.name(), new ObjectId(id));

            Bson updateUser;
            if (inc > 0) {
                updateUser = Updates.push(Question.FN.participatingIdList.name(), userId);
            } else {
                updateUser = Updates.pull(Question.FN.participatingIdList.name(), userId);
            }

            Bson bson = Updates.combine(updateUser, Updates.inc(Question.FN.usefulCount.name(), inc));

            UpdateResult result = getCollection(entityName).updateOne(filter, bson);
            if (result.getModifiedCount() > 0) return true;
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Question> search(List<String> tags, String term, String liked, Pageable pageable, Object... fields) throws CustomException {
        if (term != null && !term.isEmpty()) {
            return entityQuery().regex(Question.FN.title ,term).with(pageable).include(fields).find();
        } else if (tags != null && !tags.isEmpty()) {
            List<ObjectId> tagIds = tags.stream().map(t -> new ObjectId(t)).collect(Collectors.toList());
            return entityQuery().isTagElementMatching(tagIds).with(pageable).include(fields).sortSystemCreationDateDESC().find();
        } else if (liked != null && !liked.isEmpty()) {

            Period days_30 = Period.ofDays(30);
            ZoneId z = ZoneId.of("Europe/Berlin");
            LocalDate today = LocalDate.now(z);
            LocalDate ago_30 = today.minus(days_30);

            return entityQuery().with(pageable).include(fields).findBetweenDates(ago_30, today,liked);

        } else {
            return entityQuery().with(pageable).include(fields).sortSystemCreationDateDESC().find();
        }
    }

    @Override
    public Long searchCount(String term, List<String> tags, String liked) throws CustomException {
        if (term != null && !term.isEmpty()) {
            return entityQuery().regex(Question.FN.title ,term).count();
        } else if (tags != null && !tags.isEmpty()) {
            List<ObjectId> tagIds = tags.stream().map(t -> new ObjectId(t)).collect(Collectors.toList());
            return entityQuery().isTagElementMatching(tagIds).count();
        } else if (liked != null && !liked.isEmpty()) {
            Period days_30 = Period.ofDays(30);
            ZoneId z = ZoneId.of("Europe/Berlin");
            LocalDate today = LocalDate.now(z);
            LocalDate ago_30 = today.minus(days_30);

            return entityQuery().countBetweenDates(ago_30, today,liked);

        } else {
            return entityQuery().count();
        }

    }


    @Override
    public List<Question> findAllByTags(List<String> tags) throws CustomException {
        List<ObjectId> tagIds = tags.stream().map(t -> new ObjectId(t)).collect(Collectors.toList());
        return entityQuery().isTagElementMatching(tagIds).include(Question.FN.title).find();
    }


    @Override
    public List<Question> getMyPage(String term, Pageable pageable, Object... fields) throws CustomException {
        if (term != null && !term.isEmpty()) {
            return entityQuery().regex(Question.FN.title ,term).isCreator().with(pageable).include(fields).sortSystemCreationDateDESC().find();
        } else {
            return entityQuery().isCreator().with(pageable).include(fields).sortSystemCreationDateDESC().find();
        }
    }

    @Override
    public Long getMyPageCount(String term) throws CustomException {
        if (term != null && !term.isEmpty()) {
            return entityQuery().regex(Question.FN.title ,term).isCreator().count();
        } else {
            return entityQuery().isCreator().count();
        }
    }
}
