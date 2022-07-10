import {Pipe, PipeTransform} from '@angular/core';
import {ExerciseApprovedEnum} from '../../models/enums/exercise-approved';

@Pipe({
  name: 'exerciseApprove'
})
export class ExerciseApprovePipe implements PipeTransform {

  transform(value: ExerciseApprovedEnum, ...args: unknown[]): string {
    switch (value) {
      case ExerciseApprovedEnum.APPROVED:
        return 'تایید شده';
      case ExerciseApprovedEnum.PENDING:
        return 'در حال بررسی';
      case ExerciseApprovedEnum.REJECTED:
        return 'رد شده';
    }
  }

}
