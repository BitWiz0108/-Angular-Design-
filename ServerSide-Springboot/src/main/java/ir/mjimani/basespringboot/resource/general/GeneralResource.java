//package ir.mjimani.basespringboot.resource.general;
//
//import ir.mjimani.basespringboot.domain.user.User;
//import ir.mjimani.basespringboot.exception.error.CustomException;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
///**
// * @author Parvin at 2021-06-06
// * email: 
// * 
// * Spring rest controller interface for the General entity.
// */
//public interface GeneralResource<T> {
//
//    @GetMapping("{id}")
//    ResponseEntity<T> getOne(@PathVariable String id) throws CustomException;
//
//    @GetMapping
//    ResponseEntity<List<T>> getAll() throws CustomException;
//
//    @PostMapping
//    ResponseEntity<T> create(@RequestBody T t) throws CustomException;
//
//}