import { Injectable } from '@angular/core';
import { ServiceBaseService } from '../../../services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../models/answer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswerService extends ServiceBaseService {
  constructor(public http: HttpClient) {
    super(http);
    this.prefix = 'answers';
  }

  updateUsefulCount(questionId: string, answerId: string) {
    return super.getService('/update-useful-count/' + answerId, { questionId });
  }

  updateAnswer(answer: Answer.Action, query: any) {
    return super.putService('/' + answer.id, answer, query);
  }

  getMyPage(
    term: string,
    page: number,
    size: number,
    totalElement: number
  ): Observable<any> {
    if (term === undefined || term === '') {
      return this.getService(
        '/get-my-page?page=' +
          (page - 1) +
          '&size=' +
          size +
          '&totalElements=' +
          totalElement
      );
    } else {
      return this.getService(
        '/get-my-page?term=' +
          term +
          '&page=' +
          (page - 1) +
          '&size=' +
          size +
          '&totalElements=' +
          totalElement
      );
    }
  }
}
