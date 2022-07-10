package ir.mjimani.basespringboot.resource.tag;

import ir.mjimani.basespringboot.domain.tag.Tag;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.resource.general.dto.ResGeneralDto;
import ir.mjimani.basespringboot.service.tag.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring rest controller implementation for the Tag entity.
 */
@RestController
@RequiredArgsConstructor
public class TagResourceImpl implements TagResource {

    private final TagService entityService;

    @Override
    public ResponseEntity<ResGeneralDto> create(Tag tag) throws CustomException {
        // Validation

        String result = entityService.create(tag);
        if (result != null && !result.isEmpty()) {
            return ResponseEntity.ok().body(new ResGeneralDto(result));
        } else {
            throw new CustomException("Error in create :: ");
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> update(String id, Tag tag) throws CustomException {
        // Validation

        Boolean result = entityService.update(id, tag);
        if (result != null && result) {
            return ResponseEntity.ok().body(new ResGeneralDto(true));
        } else {
            throw new CustomException("Error in update :: " + id);
        }
    }

    @Override
    public ResponseEntity<ResGeneralDto> delete(String id) throws CustomException {
        // Validation

        Boolean result = entityService.delete(id);
        if (result != null && result) {
            return ResponseEntity.ok().body(new ResGeneralDto(true));
        } else {
            throw new CustomException("Error in delete :: " + id);
        }
    }

    @Override
    public ResponseEntity<Tag> getOne(String id) throws CustomException {
        // Validation
        return ResponseEntity.ok().body(entityService.getOne(id));
    }

    @Override
    public ResponseEntity<List<Tag>> getList() throws CustomException {
        List<Tag> tagList = entityService.getList();
        if (tagList == null) {
            tagList = new ArrayList<>();
        }
        return ResponseEntity.ok().body(tagList);
    }
}