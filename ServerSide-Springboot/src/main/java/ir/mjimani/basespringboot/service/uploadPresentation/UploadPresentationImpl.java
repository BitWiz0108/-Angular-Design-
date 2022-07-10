package ir.mjimani.basespringboot.service.uploadPresentation;

import ir.mjimani.basespringboot.dao.question.QuestionDao;
import ir.mjimani.basespringboot.domain.answer.Answer;
import ir.mjimani.basespringboot.domain.question.Question;
import ir.mjimani.basespringboot.domain.uploadPresentation.UploadPresentation;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.security.model.JwtUser;
import ir.mjimani.basespringboot.security.tools.SecurityUtils;
import ir.mjimani.basespringboot.service.answer.AnswerService;
import ir.mjimani.basespringboot.service.user.UserService;
import ir.mjimani.basespringboot.service.user.point.UserPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class UploadPresentationImpl implements UploadPresentationService {

    private final QuestionDao questionDao;

    private final AnswerService answerService;

    private final UserService userService;

    @Override
    public Question create(UploadPresentation uploadPresentation) throws CustomException {

        Question question = new Question();
        question.setTitle(uploadPresentation.getTitle());
        question.setFirstAuthorName(uploadPresentation.getFirstAuthorName());
        question.setYear(uploadPresentation.getYearOfPaper());
        question.setName(uploadPresentation.getName());
        question.setBody(uploadPresentation.getBody());
        question.setCreatorDisplayName(uploadPresentation.getCreatorDisplayName());
        question.setTagList(uploadPresentation.getTagList());

        question.initToSave();
        String savedQuestion = questionDao.create(question);

        if (savedQuestion != null && !savedQuestion.isEmpty()) {
//            userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.QUESTION_ASK_POINT.getValue());

            Answer answer = new Answer();
            answer.setBody(uploadPresentation.getBody());
            answer.setVideoLink(uploadPresentation.getPresentationLink());
            answer.setUploadedPresentation(uploadPresentation.getUploadAPresentation());
            answer.setCreatorDisplayName(uploadPresentation.getCreatorDisplayName());
            answer.setAuthorCheck(uploadPresentation.getAuthorCheck());
            answer.setUsefulCount(0);
            answerService.create(savedQuestion, answer);
        }

        return questionDao.getOne(savedQuestion);

//        if (savedQuestion != null && !savedQuestion.isEmpty()) {
//            userService.addPoints(SecurityUtils.getLoggedInUserId(), UserPoint.ANSWER_POINTS.getValue());
//            return ResponseEntity.ok().body(questionDao.getOne(savedQuestion));
//        } else {
//            throw new CustomException("Error in create question :: ", 407);
//        }
    }

    @Override
    public String uploadFile(Authentication authentication, MultipartFile file) throws CustomException, IOException {
//        return null;
        String newFolderDir = "./referencees/" + ((JwtUser) authentication.getPrincipal()).getUserId() + "/";
        File newFile = new File(newFolderDir);
        if (!newFile.exists()) {
            newFile.mkdirs();
        }
        Path path = Paths.get(newFolderDir + file.getOriginalFilename());
        Files.write(path, file.getBytes());
        return path.toString();
    }
}
