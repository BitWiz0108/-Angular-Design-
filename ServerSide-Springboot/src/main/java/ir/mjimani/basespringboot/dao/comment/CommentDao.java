package ir.mjimani.basespringboot.dao.comment;

import ir.mjimani.basespringboot.domain.comment.Comment;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author Jay email : hjdsolution@gmail.com phone : jaysolution2 Spring rest
 *         controller interface for the Comment entity. Spring Data MongoDB dao
 *         interface for the Comment in Question entity.
 */
public interface CommentDao {

	Boolean createComment(Comment answer) throws CustomException;

}
