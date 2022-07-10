package ir.mjimani.basespringboot.resource.reporting;

import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.reporting.ReportIssue;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/" + ReportIssue.END_POINT)
public interface ReportIssueResource {

    @PostMapping()
    ResponseEntity<ResGeneralDto> create(@RequestBody ReportIssue reportIssue) throws CustomException;

    @PutMapping("{id}")
    ResponseEntity<ResGeneralDto> update(@PathVariable String id, @RequestBody ReportIssue question) throws CustomException;

    @DeleteMapping("{id}")
    ResponseEntity<ResGeneralDto> delete(@PathVariable String id) throws CustomException;

    @GetMapping("{id}")
    ResponseEntity<ReportIssue> getOne(@PathVariable String id) throws CustomException;

    @GetMapping()
    ResponseEntity<List<ReportIssue>> getList(Authentication authentication) throws CustomException;

    @GetMapping("question/{qId}")
    ResponseEntity<ReportIssue> getOneByQuestionId(@PathVariable String qId) throws CustomException;
}
