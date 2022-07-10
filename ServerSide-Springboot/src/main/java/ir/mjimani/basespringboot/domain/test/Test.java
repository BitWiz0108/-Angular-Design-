package ir.mjimani.basespringboot.domain.test;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author MjImani at 2021-06-01
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document("MyTest")
public class Test {

    @Transient
    public final static String ENTITY_NAME = "tests";

    @Id
    private String id;

    private String title;
}
