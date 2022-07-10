package ir.mjimani.basespringboot.service.reporting;


import ir.mjimani.basespringboot.dao.reporting.ReportIssueDao;
import ir.mjimani.basespringboot.domain.general.GeneralDomain;
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

    @Override
    public String create(ReportIssue reportIssue) throws CustomException {
        reportIssue.initToSave();
        String created = entityDao.create(reportIssue);
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
    public ReportIssue getOne(String id) throws CustomException {
        return entityDao.getOne(id);
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
