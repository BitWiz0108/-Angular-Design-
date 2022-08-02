package ir.mjimani.basespringboot.resource.reporting;

import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.reporting.ReportIssue;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import ir.mjimani.basespringboot.service.reporting.ReportIssueService;
import ir.mjimani.basespringboot.service.user.UserService;
import ir.mjimani.basespringboot.service.user.point.UserPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReportIssueResourceImpl implements ReportIssueResource{

    private final ReportIssueService reportIssueService;
    private final UserService userService;

    @Override
    public ResponseEntity<ResGeneralDto> create(ReportIssue reportIssue) throws CustomException {
        // Validation
        String result = reportIssueService.create(reportIssue);
        if (result != null && !result.isEmpty()) {
            userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.QUESTION_ASK_POINT.getValue());
            return ResponseEntity.ok().body(new ResGeneralDto(result));
        } else {
            throw new CustomException("Error in create :: ");
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> update(String id, ReportIssue question) throws CustomException {
        // Validation

        Boolean result = reportIssueService.update(id, question);
        if (result != null && result) {
            return ResponseEntity.ok().body(new ResGeneralDto(true));
        } else {
            throw new CustomException("Error in update :: " + id);
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> delete(String id) throws CustomException {
        // Validation

        Boolean result = reportIssueService.delete(id);
        if (result != null && result) {
            return ResponseEntity.ok().body(new ResGeneralDto(true));
        } else {
            throw new CustomException("Error in delete :: " + id);
        }
    }

    @Override
    public ResponseEntity<List<ReportIssue>> getOneList(String id) throws CustomException {
        // Validation
        List<ReportIssue> reportIssue = reportIssueService.getOneList(id);
        if (reportIssue != null) {
            return ResponseEntity.ok().body(reportIssue);
        } else {
            return ResponseEntity.ok().body(new ArrayList<ReportIssue>());
//            throw new CustomException("Not found entity", 406);
        }
    }

    @Override
    public ResponseEntity<List<ReportIssue>> getList(Authentication authentication) throws CustomException {
        // Validation

        List<ReportIssue> reportIssueList = reportIssueService.getList(authentication);
        if (reportIssueList == null) {
            reportIssueList = new ArrayList<>();
        }
        return ResponseEntity.ok().body(reportIssueList);
    }


    @Override
    public ResponseEntity<ReportIssue> getOneByQuestionId(String qid) throws CustomException {
        // Validation
        ReportIssue reportIssue = reportIssueService.getOneByQuestionId(qid);
        if (reportIssue != null) {
            return ResponseEntity.ok().body(reportIssue);
        } else {
            throw new CustomException("Not found entity", 406);
        }
    }
}
