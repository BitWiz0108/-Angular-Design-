package ir.mjimani.basespringboot.tools.db;

import ir.mjimani.basespringboot.exception.error.CustomException;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import java.net.UnknownHostException;

/**
 * 
 * @author yaqub
 *
 */
@Primary
@Repository
public class CustomMongoTemplate<T> extends MongoTemplate {

	protected final MongoDatabaseFactory mongoDbFactory;

	public CustomMongoTemplate(MongoDatabaseFactory mongoDbFactory) {
		super(mongoDbFactory);
		this.mongoDbFactory = mongoDbFactory;
	}

	protected <T> CommonQuery<T> mongoQuery(Class<T> entityClass) {
		CommonQuery<T> queryDetails = new CommonQuery<T>(mongoDbFactory);
		queryDetails.setEntityClass(entityClass);
		return queryDetails;
	}

	@Bean
	public MongoTemplate mongoTemplate() throws UnknownHostException {
		MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory);
		return mongoTemplate;
	}

	@SneakyThrows
	@Override
	public <T> T save(T objectToSave) {
		try {
			return super.save(objectToSave);
		}catch (Exception e){
			e.printStackTrace();
			throw new CustomException("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}