package ir.mjimani.basespringboot.resource.comment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ir.mjimani.basespringboot.domain.comment.Comment;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.service.comment.CommentService;
import lombok.RequiredArgsConstructor;

/**
 * @author Jay email : hjdsolution@gmail.com skype : jaysolution2 Spring service
 *         interface for the Answer entity.
 */
@RestController
@RequiredArgsConstructor
public class CommentResourceImpl implements CommentResource {

	private final CommentService entityService;

	@Override
	public ResponseEntity<Comment> create(Comment comment) throws CustomException {
		comment.validation();
		Boolean result = entityService.create(comment);
		if (result) {
			return ResponseEntity.ok().body(comment);
		} else {
			return null;
		}
	}
}