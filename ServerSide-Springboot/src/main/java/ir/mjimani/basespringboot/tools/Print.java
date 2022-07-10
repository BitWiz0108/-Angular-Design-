package ir.mjimani.basespringboot.tools;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by meghdad on 6/13/17.
 */
public class Print {
  public static void print(Object object) {
    ObjectMapper mapper = new ObjectMapper();
    try {
      if (object != null) {

        System.out.println(
          "*****************< " + object.getClass().getName() + " >*****************\n" +
            mapper.writerWithDefaultPrettyPrinter().writeValueAsString(object) +
            "\n*****************</ " + object.getClass().getName() + " >*****************"
        );
      } else {
        System.out.println("object is null");
      }
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
  }

  public static void print(String label, Object object) {
    ObjectMapper mapper = new ObjectMapper();
    try {
      System.out.println(label + " : " + mapper.writerWithDefaultPrettyPrinter().writeValueAsString(object));
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
  }

  public static String toString(Object object) {
    ObjectMapper mapper = new ObjectMapper();
    try {
      return mapper.writeValueAsString(object);
    } catch (JsonProcessingException e) {
//            e.printStackTrace();
      System.out.println("Print method cannot print the object !");
    }
    return null;
  }
}
