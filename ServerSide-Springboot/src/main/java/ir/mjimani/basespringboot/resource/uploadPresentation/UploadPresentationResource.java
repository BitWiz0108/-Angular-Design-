package ir.mjimani.basespringboot.resource.uploadPresentation;

import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.uploadPresentation.UploadPresentation;
import ir.mjimani.basespringboot.exception.error.CustomException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequestMapping("api/" + UploadPresentation.END_POINT)
public interface UploadPresentationResource {

    @PostMapping()
    ResponseEntity<Question> createRequest(@RequestBody UploadPresentation uploadPresentation) throws CustomException;

    @PostMapping("upload")
    ResponseEntity<List<String>> uploadFile(Authentication authentication, @RequestParam MultipartFile file) throws CustomException, IOException;

    @PostMapping("download")
    ResponseEntity<byte[]> downloadFile(@RequestBody String[] path, HttpServletResponse response) throws CustomException, IOException;
}
