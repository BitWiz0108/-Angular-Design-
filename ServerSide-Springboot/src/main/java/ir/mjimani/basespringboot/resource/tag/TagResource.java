package ir.mjimani.basespringboot.resource.tag;

import ir.mjimani.basespringboot.domain.tag.Tag;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Parvin at 2021-06-17
 * email: 
 * 
 * Spring rest controller interface for the Tag entity.
 */
@RequestMapping("api/" + Tag.END_POINT)
public interface TagResource {

    @PostMapping()
    ResponseEntity<ResGeneralDto> create(@RequestBody Tag tag) throws CustomException;

    @PutMapping("{id}")
    ResponseEntity<ResGeneralDto> update(@PathVariable String id, @RequestBody Tag tag) throws CustomException;

    @DeleteMapping("{id}")
    ResponseEntity<ResGeneralDto> delete(@PathVariable String id) throws CustomException;

    @GetMapping("{id}")
    ResponseEntity<Tag> getOne(@PathVariable String id) throws CustomException;

    @GetMapping()
    ResponseEntity<List<Tag>> getList() throws CustomException;

}