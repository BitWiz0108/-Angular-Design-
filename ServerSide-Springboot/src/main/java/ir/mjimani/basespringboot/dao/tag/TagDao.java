package ir.mjimani.basespringboot.dao.tag;

import ir.mjimani.basespringboot.domain.tag.Tag;
import ir.mjimani.basespringboot.exception.error.CustomException;

import java.util.List;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring Data MongoDB dao interface for the Tag entity.
 */
public interface TagDao {
    
    String create(Tag tag) throws CustomException;

    Boolean update(String id, Tag tag) throws CustomException;

    Boolean delete(String id) throws CustomException;

    Tag getOne(String id) throws CustomException;

    List<Tag> getList() throws CustomException;

    Boolean existsTag(String title) throws CustomException;
}
