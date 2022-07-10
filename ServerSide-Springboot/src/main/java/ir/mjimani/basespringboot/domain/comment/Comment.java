package ir.mjimani.basespringboot.domain.comment;

import org.springframework.data.annotation.Transient;
import org.springframework.util.StringUtils;

import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.exception.error.CustomException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Comment extends GeneralDomain {

	@Transient
	public final static String END_POINT = "comment";

	@Transient
	public final static String ENTITY_NAME = "comment";

	public enum FN {
		userName, userId, description, questionId
	}

	private String userName;
	private String description;
	private String questionId;

	public void validation() throws CustomException {

		if (!StringUtils.hasText(description)) {
			throw new CustomException("video link is null or empty", 407);
		}
		if (!StringUtils.hasText(questionId)) {
			throw new CustomException("question id is null or empty", 407);
		}
	}

}
