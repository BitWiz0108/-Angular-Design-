package ir.mjimani.basespringboot.dao.comment;

import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.stereotype.Repository;

import ir.mjimani.basespringboot.domain.comment.Comment;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.tools.db.CommonQuery;
import ir.mjimani.basespringboot.tools.db.CustomMongoTemplate;

/**
 * @author Jay email : hjdsolution@gmail.com phone : jaysolution2 Spring Data
 *         MongoDB dao interface for the Comment in Question entity.
 */
@Repository
public class CommentDaoImpl extends CustomMongoTemplate<Question> implements CommentDao {

	private final Class<Question> entityClass = Question.class;
	
	protected CommonQuery<Question> entityQuery() {
        return super.mongoQuery(entityClass);
    }
	
	public CommentDaoImpl(MongoDatabaseFactory mongoDbFactory) {
		super(mongoDbFactory);
	}

	@Override
	public Boolean createComment(Comment comment) throws CustomException {
		 return entityQuery()
	                .isId(comment.getQuestionId())
	                .push(Question.FN.commentList, comment)
	                .updateFirst();
	}

}
