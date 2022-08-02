package ir.mjimani.basespringboot.tools.db;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import ir.mjimani.basespringboot.domain.question.Question;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import ir.mjimani.basespringboot.exception.error.CustomException;
import lombok.Getter;
import lombok.Setter;

/**
 * This class is top layer for MongoDB query. I rewrite Spring data common
 * function for MongoDB because this way reduce query code size and it cause we
 * focus on program logic.
 *
 * @author yaqub
 */
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Repository
public class BasicQuery<T> extends CustomMongoTemplate<T> {

    private Query query = new Query();
    private Update update = new Update();
    private Class<T> entityClass;

    public BasicQuery(MongoDatabaseFactory mongoDbFactory) {
        super(mongoDbFactory);
    }

    public <T> CommonQuery<T> createCommonQuery(Class<T> entityClass) {
        CommonQuery<T> commonQuery = new CommonQuery<T>(mongoDbFactory);
        commonQuery.setEntityClass(entityClass);
        commonQuery.setQuery(this.query);
        commonQuery.setUpdate(this.update);
        return commonQuery;
    }

    public T findOne() throws CustomException {
        try {
            return this.findOne(query, entityClass);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<T> find() throws CustomException {
        try {
            return this.find(query, entityClass);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<T> findBetweenDates(LocalDate fromDate , LocalDate toDate, String liked) throws CustomException {

        Criteria c1 = Criteria.where("systemCreationDate").gte(fromDate);
//        Criteria c2 = Criteria.where("systemCreationDate").lte(toDate);

        try {
            if(liked.equalsIgnoreCase("like")) {
                Criteria c = new Criteria().andOperator(c1, Criteria.where("usefulCount").gt(0));
                return this.find(query.addCriteria(c).with(Sort.by(Sort.Direction.DESC, "usefulCount")), entityClass);
            }else if(liked.equalsIgnoreCase("likeWithVideo")) {
                Criteria c = new Criteria().andOperator(c1,Criteria.where("questionStatus").is("WITHPRESENTATION"));
                return this.find(query.addCriteria(c).with(Sort.by(Sort.Direction.DESC, "usefulCount")), entityClass);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    public long countBetweenDates(LocalDate fromDate , LocalDate toDate ,String liked) throws CustomException {

        Criteria c1 = Criteria.where("systemCreationDate").gte(fromDate);
//        Criteria c2 = Criteria.where("systemCreationDate").lte(toDate);
        try {
            if(liked.equalsIgnoreCase("like")) {
                Criteria c = new Criteria().andOperator(c1,Criteria.where("usefulCount").gt(0));
                query = Query.query(c);
            }
            else if(liked.equalsIgnoreCase("likeWithVideo")) {
                Criteria c = new Criteria().andOperator(c1,Criteria.where("questionStatus").is("WITHPRESENTATION"));
                query = Query.query(c);
            }
            return this.count(query, entityClass);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public Long count() throws CustomException {
        try {
            return this.count(query, entityClass);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public Page<T> find(Pageable pageable, Long totalElements) throws CustomException {
        Query queryWithPageable = this.query;
        queryWithPageable.with(pageable);

        if (totalElements != null && totalElements > 0)
            try {
                return new PageImpl<>(this.find(queryWithPageable, entityClass), pageable, totalElements);
            } catch (Exception e) {
                e.printStackTrace();
                throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        try {
            return new PageImpl<>(this.find(queryWithPageable, entityClass), pageable, this.count(query, entityClass));
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public T findAndModify() throws CustomException {
        try {
            return this.findAndModify(query, update, entityClass);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Boolean exists() throws CustomException {
        try {
            return this.exists(query, entityClass);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public CommonQuery<T> exists(Object field, Boolean value) {
        query.addCriteria(Criteria.where(field.toString()).exists(value));
        return createCommonQuery(entityClass);
    }

    public CommonQuery<T> is(Object field, Object value) {
        query.addCriteria(Criteria.where(field.toString()).is(value));
        return createCommonQuery(entityClass);
    }

    public CommonQuery<T> all(Object field, Object... value) {
        query.addCriteria(Criteria.where(field.toString()).all(value));
        return createCommonQuery(entityClass);
    }

    public CommonQuery<T> elementMatching(Object field, Object field2, int position, List<ObjectId> objectIds) {
        query.addCriteria(Criteria.where(field2.toString()).in(objectIds));
        //query.fields().position(field.toString(), position);
        return createCommonQuery(this.entityClass);
    }

    public CommonQuery<T> gt(Object field, Object value) {
        query.addCriteria(Criteria.where(field.toString()).gt(value));
        return createCommonQuery(entityClass);
    }

    public CommonQuery<T> include(Object... fieldList) {
        Optional.of(Arrays.asList(fieldList)).ifPresent(l -> l.forEach(field -> {
            query.fields().include(field.toString());
        }));
        return createCommonQuery(this.entityClass);
    }

    public CommonQuery<T> set(Object field, Object value) {
        update.set(field.toString(), value);
        return createCommonQuery(this.entityClass);
    }

    public Boolean updateFirst() throws CustomException {
        try {
            return updateResultBoolean(this.updateFirst(query, update, entityClass));
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Boolean delete() throws CustomException {
        try {
            return deleteResultBoolean(this.remove(query, entityClass));
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Boolean deleteResultBoolean(DeleteResult deleteResult) {
        if (deleteResult.getDeletedCount() > 0)
            return true;
        return false;
    }

    private Boolean updateResultBoolean(UpdateResult updateResult) {
        if (updateResult.getModifiedCount() > 0)
            return true;
        return false;
    }

    public CommonQuery<T> withSort(Object field, Sort.Direction direction) {
        this.query.with(Sort.by(direction, field.toString()));
        return createCommonQuery(this.entityClass);
    }

    public CommonQuery<T> push(Object field, Object value) {
        update.push(field.toString(), value);
        return createCommonQuery(this.entityClass);
    }

    public CommonQuery<T> pull(Object field, Object value) {
        update.pull(field.toString(), value);
        return createCommonQuery(this.entityClass);
    }

    public CommonQuery<T> inc(Object field, Number inc) {
        update.inc(field.toString(), inc);
        return createCommonQuery(this.entityClass);
    }

    public CommonQuery<T> textMatching(String value) {
        TextCriteria criteria = TextCriteria
                .forLanguage("none")
//                .forDefaultLanguage()
                .matching(value);
        query = TextQuery.queryText(criteria).sortByScore();
        return createCommonQuery(this.entityClass);
    }

    public CommonQuery<T> regex(Object field, Object value) {
        query.addCriteria(Criteria.where(field.toString()).regex(value.toString(), "i"));
        return createCommonQuery(this.entityClass);
    }

    public CommonQuery<T> regex(Object field, Pattern pattern) {
        query.addCriteria(Criteria.where(field.toString()).regex(pattern));
        return createCommonQuery(this.entityClass);
    }

    public CommonQuery<T> with(Pageable pageable) {
        query.with(pageable);
        return createCommonQuery(this.entityClass);
    }


}
