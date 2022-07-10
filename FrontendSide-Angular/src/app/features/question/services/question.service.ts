import { Injectable } from '@angular/core';
import { ServiceBaseService } from '../../../services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionService extends ServiceBaseService {
  constructor(public http: HttpClient) {
    super(http);
    this.prefix = 'questions';
  }

  forShow(id) {
    return super.getService('/for-show/' + id);
  }

  getListByTitle(title){
    return super.postService("/title-search",title)
  }

  updateBestAnswer(questionId: string, answerId: string) {
    return super.getService('/update-best-answer/' + questionId, { answerId });
  }

  updateUsefulCount(questionId: string) {
    return super.getService('/update-useful-count/' + questionId);
  }

  getAllPageable(
    term: string,
    selectedTagList: any,
    page: number,
    size: number,
    totalElement: number,
    liked: string
  ): Observable<any> {
    if (term !== undefined && term !== '') {
      return this.getService(
        '/search?term=' +
          term +
          '&page=' +
          (page - 1) +
          '&size=' +
          size +
          '&totalElements=' +
          totalElement
      );
    } else if (selectedTagList && selectedTagList.length > 0) {
      return this.getService(
        '/search?selectedTagList=' +
          selectedTagList +
          '&page=' +
          (page - 1) +
          '&size=' +
          size +
          '&totalElements=' +
          totalElement
      );
    } else if (liked !== undefined && liked !== '') {
      return this.getService(
        '/search?page=' +
          (page - 1) +
          '&size=' +
          size +
          '&totalElements=' +
          totalElement +
          '&liked=' +
          liked
      );
    } else {
      return this.getService(
        '/search?page=' +
          (page - 1) +
          '&size=' +
          size +
          '&totalElements=' +
          totalElement
      );
    }
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
