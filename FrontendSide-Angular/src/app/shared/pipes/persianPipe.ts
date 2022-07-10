import {Pipe, PipeTransform} from "@angular/core";
import {Tools} from "../tools/Tools";

@Pipe({
  name: 'toPersian'
})
export class PersianPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    try {
      return Tools.EnToFa(value);
    } catch(e) {
      console.log(e);
      return value;
    }
  }
}
