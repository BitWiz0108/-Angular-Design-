package ir.mjimani.basespringboot.service.comment;

import ir.mjimani.basespringboot.domain.comment.Comment;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author Jay
 * email : hjdsolution@gmail.com
 * skype : jaysolution2
 * Spring service interface for the Answer entity.
 */
public interface CommentService {

	Boolean create(Comment answer) throws CustomException;

}