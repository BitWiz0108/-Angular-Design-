package ir.mjimani.basespringboot.dao.tag;

import ir.mjimani.basespringboot.domain.tag.Tag;
import ir.mjimani.basespringboot.exception.error.CustomException;
import ir.mjimani.basespringboot.tools.db.CommonQuery;
import ir.mjimani.basespringboot.tools.db.CustomMongoTemplate;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 * Spring Data MongoDB dao interface for the Tag entity.
 */
@Repository
public class TagDaoImpl extends CustomMongoTemplate<Tag> implements TagDao {

    public TagDaoImpl(MongoDatabaseFactory mongoDbFactory) {
        super(mongoDbFactory);
    }

    private final Class<Tag> entityClass = Tag.class;

    protected CommonQuery<Tag> entityQuery() {
        return super.mongoQuery(entityClass);
    }

    @Override
    public String create(Tag tag) throws CustomException {
        tag = save(tag);
        if (tag.getId() != null) {
            return tag.getId();
        }
        return "";
    }

    @Override
    public Boolean update(String id, Tag tag) throws CustomException {
        return entityQuery()
                .isId(id)
                .set(Tag.FN.title, tag.getTitle())
                .set(Tag.FN.description, tag.getDescription())
                .updateFirst();
    }

    @Override
    public Boolean delete(String id) throws CustomException {
        return entityQuery()
                .isId(id)
                .delete();
    }

    @Override
    public Tag getOne(String id) throws CustomException {
        return entityQuery()
                .isId(id)
                .findOne();
    }

    @Override
    public List<Tag> getList() throws CustomException {
        return entityQuery()
                .find();
    }

    @Override
    public Boolean existsTag(String title) throws CustomException {
        return entityQuery()
                .is(Tag.FN.title, title)
                .exists();
    }
}
