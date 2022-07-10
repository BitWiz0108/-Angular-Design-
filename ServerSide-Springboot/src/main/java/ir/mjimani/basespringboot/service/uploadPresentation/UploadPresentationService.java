package ir.mjimani.basespringboot.service.uploadPresentation;

import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.uploadPresentation.UploadPresentation;
import ir.mjimani.basespringboot.exception.error.CustomException;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadPresentationService {

    Question create(UploadPresentation uploadPresentation) throws CustomException;

    String uploadFile(Authentication authentication, MultipartFile file) throws CustomException, IOException;

}
