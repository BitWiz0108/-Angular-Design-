package ir.mjimani.basespringboot.service.reporting;


import ir.mjimani.basespringboot.dao.answer.AnswerDao;
import ir.mjimani.basespringboot.dao.question.QuestionDao;
import ir.mjimani.basespringboot.dao.reporting.ReportIssueDao;
import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.reporting.ReportIssue;
import ir.mjimani.basespringboot.exception.error.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportIssueServiceImpl implements ReportIssueService{

    private final ReportIssueDao entityDao;
    private final QuestionDao questionDao;
    private final AnswerDao answerDao;

    @Override
    public String create(ReportIssue reportIssue) throws CustomException {
        reportIssue.initToSave();
        String created = entityDao.create(reportIssue);

        if(created != ""){
            Question question = questionDao.getOne(reportIssue.getPaperId());
            if (question == null) {
                throw new CustomException("Question not found.", 406);
            }else {
                Answer answer =new Answer();
                for (Answer item : question.getAnswerList() ){
                    if(item.getId().equals(reportIssue.getVideoId())){
                        answer =item;
                    }
                }
//                Answer answer = answerDao.getOneAnswer(question.getId(),reportIssue.getVideoId());
                answer.setBugReport("Yes");
                answerDao.deleteAnswer(question.getId(),reportIssue.getVideoId());
                answerDao.createAnswer(question.getId(), answer);

            }


        }

        return created;
    }

    @Override
    public Boolean update(String id, ReportIssue reportIssue) throws CustomException {
        return entityDao.update(id, reportIssue);
    }

    @Override
    public Boolean delete(String id) throws CustomException {
        return entityDao.delete(id);
    }

    @Override
    public List<ReportIssue> getOneList(String id) throws CustomException {
        return entityDao.getOneList(id);
    }

    @Override
    public ReportIssue getOneByAnswerId(String answerId) throws CustomException {
        return entityDao.getOneByAnswerId(answerId);
    }

    @Override
    public List<ReportIssue> getList(Authentication authentication) throws CustomException {
        return entityDao.getList(authentication,
                GeneralDomain.GFN.id, GeneralDomain.GFN.systemCreationDate,
                ReportIssue.FN.issue, ReportIssue.FN.paperId, ReportIssue.FN.videoId,
                ReportIssue.FN.title , ReportIssue.FN.questionStatus , ReportIssue.FN.seen,
                ReportIssue.FN.creatorDisplayName , ReportIssue.FN.date,ReportIssue.FN.usefulCount,
                ReportIssue.FN.tag
        );
    }

    @Override
    public ReportIssue getOneByQuestionId(String id) throws CustomException {
        return entityDao.findByQuestionId(id);
    }

}
