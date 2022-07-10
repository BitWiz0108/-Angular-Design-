package ir.mjimani.basespringboot.service.reporting;

import ir.mjimani.basespringboot.domain.reporting.ReportIssue;
import ir.mjimani.basespringboot.exception.error.CustomException;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ReportIssueService {

    String create(ReportIssue reportIssue) throws CustomException;

    Boolean update(String id, ReportIssue reportIssue) throws CustomException;

    Boolean delete(String id) throws CustomException;

    ReportIssue getOne(String id) throws CustomException;

    ReportIssue getOneByAnswerId(String id) throws CustomException;

    List<ReportIssue> getList(Authentication authentication) throws CustomException;

    ReportIssue getOneByQuestionId(String qId) throws CustomException;
}
