//package ir.mjimani.basespringboot.resource.general;
//
//import ir.mjimani.basespringboot.exception.error.CustomException;
//import ir.mjimani.basespringboot.service.general.GeneralService;
//import org.springframework.context.annotation.Primary;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
///**
// * @author Parvin at 2021-06-06
// * email: 
// * 
// * Spring rest controller implementation for the General entity.
// */
//@Primary
//@RestController
//public class GeneralResourceImpl<T> implements GeneralResource<T> {
//
//    private final GeneralService<T> generalService;
//
//    public GeneralResourceImpl(GeneralService<T> generalService) {
//        this.generalService = generalService;
//    }
//
//    @Override
//    public ResponseEntity<T> getOne(String id) throws CustomException {
//        T t = generalService.getOne(id);
//        if (t == null) {
//            throw new CustomException("Not Found", HttpStatus.NOT_FOUND);
//        }
//        return ResponseEntity.ok(t);
//    }
//
//    @Override
//    public ResponseEntity<List<T>> getAll() throws CustomException {
//        List<T> listT = generalService.getAll();
//        if (listT == null) {
//            throw new CustomException("Not Found", HttpStatus.NOT_FOUND);
//        }
//        return ResponseEntity.ok(listT);
//    }
//
//    @Override
//    public ResponseEntity<T> create(T t) throws CustomException {
//        T result = generalService.create(t);
//        if (result.equals(false)) {
//            throw new CustomException("Not Found");
//        }
//        return ResponseEntity.ok(result);
//    }
//}