package ir.mjimani.basespringboot.resource.general.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author MjImani at 2021-06-17
 * email : mjimani.ir@gmail.com
 * phone : +989191414931
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResGeneralDto {

    private String id;

    private Boolean result;

    public ResGeneralDto(String id) {
        this.id = id;
    }

    public ResGeneralDto(Boolean result) {
        this.result = result;
    }
}
