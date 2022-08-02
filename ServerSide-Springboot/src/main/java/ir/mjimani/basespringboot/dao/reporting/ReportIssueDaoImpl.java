package ir.mjimani.basespringboot.dao.reporting;

import ir.mjimani.basespringboot.domain.general.GeneralDomain;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.reporting.ReportIssue;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.security.model.JwtUser;
import ir.mjimani.basespringboot.tools.db.CommonQuery;
import ir.mjimani.basespringboot.tools.db.CustomMongoTemplate;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class ReportIssueDaoImpl extends CustomMongoTemplate<ReportIssue> implements ReportIssueDao {

    public ReportIssueDaoImpl(MongoDatabaseFactory mongoDbFactory) {
        super(mongoDbFactory);
    }

    private final Class<ReportIssue> entityClass = ReportIssue.class;

    private String entityName = ReportIssue.ENTITY_NAME;

    protected CommonQuery<ReportIssue> entityQuery() {
        return super.mongoQuery(entityClass);
    }

    @Override
    public String create(ReportIssue reportIssue) throws CustomException {
        reportIssue = save(reportIssue);
        if (reportIssue.getId() != null) {
            return reportIssue.getId();
        }
        return "";
    }

    @Override
    public Boolean update(String id, ReportIssue reportIssue) throws CustomException {
        return entityQuery()
                .isId(id)
                .isCreator()
                .set(ReportIssue.FN.issue, reportIssue.getIssue())
                .set(ReportIssue.FN.paperId, reportIssue.getPaperId())
                .set(ReportIssue.FN.videoId , reportIssue.getVideoId())
                .set(ReportIssue.FN.title , reportIssue.getTitle())
                .updateFirst();
    }

    @Override
    public Boolean delete(String id) throws CustomException {
        return entityQuery()
                .isId(id)
                .isCreator()
                .delete();
    }



    @Override
    public List<ReportIssue> getOneList(String qId) throws CustomException {
        return entityQuery().regex(ReportIssue.FN.paperId , qId).find();
    }

    @Override
    public ReportIssue getOneByAnswerId(String answetId) throws CustomException {
        return entityQuery()
                .is(ReportIssue.FN.videoId, answetId)
                .findOne();
    }

    @Override
    public ReportIssue getOne(String id, Object... fields) throws CustomException {
        return entityQuery()
                .isId(id)
                .include(fields)
                .findOne();
    }

    @Override
    public List<ReportIssue> getList(Authentication authentication, Object... fields) throws CustomException {
        return entityQuery()
                .is(GeneralDomain.GFN.creatorId ,((JwtUser) authentication.getPrincipal()).getUserId())
                .include(fields)
                .find();
    }

    @Override
    public ReportIssue findByQuestionId(String qId) throws CustomException {
        return entityQuery()
                .is(ReportIssue.FN.paperId, qId)
                .findOne();
    }
}
