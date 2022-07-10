package ir.mjimani.basespringboot.resource.comment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import ir.mjimani.basespringboot.domain.comment.Comment;
import ir.mjimani.basespringboot.exception.error.CustomException;

/**
 * @author Jay email : hjdsolution@gmail.com phone : jaysolution2 Spring rest
 *         controller interface for the Comment entity.
 */
@RequestMapping("api/" + Comment.END_POINT)
public interface CommentResource {

	@PostMapping()
	ResponseEntity<Comment> create(@RequestBody Comment comment) throws CustomException;

}