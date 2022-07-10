package ir.mjimani.basespringboot;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class BaseSpringbootApplication {

    public static void main(String[] args) {
        String value = "Starting the program on the server side";
        String[] values = value.split(",");
        System.out.println("values = " + Arrays.asList(values));
        SpringApplication.run(BaseSpringbootApplication.class, args);
    }

}
