import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Config } from "../../config/config";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private notifier: NotifierService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError(err => {
      console.log(err);
      switch (err.status) {
        case 401:
          if (!request.url.startsWith('https://www.googleapis.com/youtube/v3/search')) {
            this.notifier.notify('error', 'Permission denied, (please sign in to get permission)');
            localStorage.clear();
          }
          this.router.navigateByUrl('/question/list');
          break;
        case 400:
          if (err.error && err.error.message) {
            if (request.url.split('/')[request.url.split('/').length - 1] !== 'login') {
              this.notifier.notify('error', err.error.message);
            }
          } else {
            this.notifier.notify('error', 'Something went wrong (error code ' + err.status + ')');
          }
          break;
        case 406:
          if (err.error && err.error.message) {
            this.notifier.notify('error', err.error.message);
          } else {
            this.notifier.notify('error', 'Something went wrong (error code ' + err.status + ')');
          }
          break;
        case 407:
          if (err.error && err.error.message) {
            this.notifier.notify('error', err.error.message);
          } else {
            this.notifier.notify('error', 'Something went wrong (error code ' + err.status + ')');
          }
          break;
        case 500:
          this.notifier.notify('error', 'Something went wrong (error code ' + err.status + ')');
          break;
        case 501:
          this.notifier.notify('error', err.error.message);
          break;
        default:
          //this.notifier.notify('error', 'Something went wrong (error code ' + err.status + ')');
      }
      // auto logout if 401 response returned from api
      // localStorage.clear();
      // this.router.navigateByUrl('/question/list');
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }

}
