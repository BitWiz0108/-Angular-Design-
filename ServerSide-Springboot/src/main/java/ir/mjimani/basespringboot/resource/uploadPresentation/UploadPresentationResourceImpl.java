package ir.mjimani.basespringboot.resource.uploadPresentation;

import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.uploadPresentation.UploadPresentation;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import ir.mjimani.basespringboot.service.uploadPresentation.UploadPresentationService;
import ir.mjimani.basespringboot.service.user.UserService;
import ir.mjimani.basespringboot.service.user.point.UserPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UploadPresentationResourceImpl implements UploadPresentationResource {

    private final UserService userService;
    private final UploadPresentationService uploadPresentationService;

    @Override
    public ResponseEntity<Question> createRequest(UploadPresentation uploadPresentation) throws CustomException {
        uploadPresentation.validation();
        Question question = uploadPresentationService.create(uploadPresentation);
        if (question != null) {
            userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.QUESTION_ASK_POINT.getValue());
            return ResponseEntity.ok().body(question);
        } else {
            throw new CustomException("Error in create presentation :: ", 407);
        }
    }

    @Override
    public ResponseEntity<List<String>> uploadFile(Authentication authentication, MultipartFile file) throws CustomException, IOException {
        String result = uploadPresentationService.uploadFile(authentication, file);
        List<String> list = new ArrayList<String>();
        list.add(result);
        if (result != null && !result.isEmpty()) {
            userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.ANSWER_POINTS.getValue());
            return ResponseEntity.ok().body(list);
        } else {
            throw new CustomException("Error in create presentation :: ", 407);
        }
    }

    @Override
    public ResponseEntity<byte[]> downloadFile(String[] filePath, HttpServletResponse response) throws CustomException, IOException {
        File file = new File(filePath[0]);
        if (!file.isFile()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        response.setContentType("application/octect-stream");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + file.getName();
        response.setHeader(headerKey, headerValue);
        BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
        byte[] buf=new byte[8192];
        try
        {
            FileInputStream fileInputStream  = new FileInputStream(file);

            int bytesread = 0, bytesBuffered = 0;
            while( (bytesread = fileInputStream.read( buf )) > -1 ) {
                out.write( buf, 0, bytesread );
                bytesBuffered += bytesread;
                if (bytesBuffered > 1024 * 5120) { //flush after 1MB
                    bytesBuffered = 0;
                }
            }
            fileInputStream.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        finally {
            if (out != null) {
                out.flush();
                out.close();
            }
        }
        return null;
    }

}
