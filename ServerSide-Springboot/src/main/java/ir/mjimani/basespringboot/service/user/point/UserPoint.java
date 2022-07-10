package ir.mjimani.basespringboot.service.user.point;

public enum UserPoint {

	QUESTION_ASK_POINT(2),QUESTION_DELETE_POINT(-2), ANSWER_POINTS(5) ,DELETE_ANSWER_POINTS(-5), USEFUL_QUE_POINTS(1), ANS_ACCEPTANCE_POINTS_TO_ASKER(1), ANS_ACCEPTANCE_POINTS_TO_ANSWER(10);

	private final int value;

	UserPoint(final int newValue) {
		value = newValue;
	}

	public int getValue() {
		return value;
	}
}
