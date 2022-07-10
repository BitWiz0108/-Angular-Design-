package ir.mjimani.basespringboot.service.tag;

import ir.mjimani.basespringboot.dao.tag.TagDao;
import ir.mjimani.basespringboot.domain.tag.Tag;
import ir.mjimani.basespringboot.exception.error.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring service implementation for the Tag entity.
 */
@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagDao entityDao;

    @Override
    public String create(Tag tag) throws CustomException {
        // Check tag title exists
        Boolean existsTag = entityDao.existsTag(tag.getTitle());
        if (existsTag) {
            throw new CustomException("Tag title is exists.", 407);
        }
        return entityDao.create(tag);
    }

    @Override
    public Boolean update(String id, Tag tag) throws CustomException {
        return entityDao.update(id, tag);
    }

    @Override
    public Boolean delete(String id) throws CustomException {
        return entityDao.delete(id);
    }

    @Override
    public Tag getOne(String id) throws CustomException {
        return entityDao.getOne(id);
    }

    @Override
    public List<Tag> getList() throws CustomException {
        return entityDao.getList();
    }
}