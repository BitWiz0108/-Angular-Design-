package ir.mjimani.basespringboot.dao.reporting;

import ir.mjimani.basespringboot.domain.reporting.ReportIssue;
import ir.mjimani.basespringboot.exception.error.CustomException;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ReportIssueDao {

    String create(ReportIssue reportIssue) throws CustomException;

    Boolean update(String id,ReportIssue reportIssue)  throws CustomException;

    Boolean delete(String id) throws CustomException;

    ReportIssue getOne(String id) throws CustomException;

    ReportIssue getOneByAnswerId(String answerId) throws CustomException;

    ReportIssue getOne(String id, Object... fields) throws CustomException;

    List<ReportIssue> getList(Authentication authentication, Object... fields) throws CustomException;

    ReportIssue findByQuestionId(String qId) throws CustomException;
}
