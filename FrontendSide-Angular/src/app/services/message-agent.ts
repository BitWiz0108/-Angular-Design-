import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NotifierService} from "angular-notifier";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Config} from "../config/config";
import {Router} from "@angular/router";
import {API_URL} from "../config/serverConfig";

@Injectable({
  providedIn: 'root'
})
export class MessageAgent {

  httpOptions: any;
  requestHeaders: HttpHeaders;

  constructor(private http: HttpClient,
              private router: Router,
              private notifierService: NotifierService) {
  }

  executeMessage(body, r?: any) {
    const ret = new Subject();
    this.postService(body).subscribe((res: any) => {
      if (res.errorCode === 0) {
        if (r) {
          r.next(res.result);
        } else {
          ret.next(res.result);
        }
      } else {
        this.errorHandling(res, body, ret);
        ret.next(res);
      }
    }, error => {
      this.errorHandling(error, body, ret);
      ret.next(error);
    });
    return ret.asObservable();
  }

  errorHandling(error, body, ret?: any) {
    console.log('error in error handling => ', error);
    if (error.status === 401 || error.errorCode === 401) {
      this.refreshToken().subscribe((res: any) => { 
        if (!res.result || !res.result.accessToken) {
          this.notifierService.notify('error', 'شناسه کاربری نامعتبر است. (کد خطای ' + res.errorCode + ')');
          localStorage.clear();
          this.router.navigateByUrl('/');
        } else {
          Config.setLocalStorageToken(res.result.accessToken);
          this.executeMessage(body, ret);
        }
      });
    } else if (error.status === 403 || error.errorCode === 403) {
      this.notifierService.notify('error', 'کاربر گرامی شما اجازه دسترسی به این سرویس را ندارید.')
    } else if (error.errorMessage && error.errorMessage.key) {
      this.notifierService.notify('error', error.errorMessage.title);
    } else {
      this.notifierService.notify('error', 'خطا در اتصال به سرور، اتصال اینترنتی خود را بررسی کنید.')
    }
  }

  refreshToken() {
    const rt = Config.getLocalStorageRefreshToken();
    console.log(rt);
    return this.http.post(API_URL + 'api/refreshToken', {refreshToken: rt}, this.httpOptions).pipe(map((res: any) => res));
  }

  executeMessageForMultiPart(body) {
    const ret = new Subject();
    this.postMultiPartService(body).subscribe((res: any) => { 
      if (res.errorCode === 0) {
        ret.next(res.result);
      } else { 
        this.executeMessage({
          title: 'createAction', parameter: {
            title: 'upload',
            param: body.parameter,
            user: Config.getLocalStorageUser(),
            response: res
          }
        });
        this.notifierService.notify('error', 'خطایی رخ داده است. (کد خطای ' + res.errorCode + ')')
        ret.next(null);
      }
    }, error => {
      if (error.status === 401 || error.status === 403) {
        this.notifierService.notify('error', 'شناسه کاربری نامعتبر است. (کد خطای ' + error.status + ')');
        localStorage.clear();
        this.router.navigateByUrl('/');
      } else if (error.status === 500) {
        this.executeMessage({
          title: 'createAction', parameter: {
            title: 'upload',
            param: body.parameter,
            user: Config.getLocalStorageUser(),
            response: error
          }
        });
        this.notifierService.notify('error', 'خطایی رخ داده است. (کد خطای ' + error.status + ')')
      }
    });
    return ret.asObservable();
  }

  postService(body) {
    let prefix = 'api/executeMessage';
    if (body.withoutToken) {
      prefix = 'api/' + body.title;
    } else {
      this.setHeader();
    }
    return this.http.post(API_URL + prefix, body, this.httpOptions).pipe(map((res: any) => res));
  }

  postMultiPartService(body) {
    this.setHeader();
    return this.http.post(API_URL + "api/upload", body, this.httpOptions).pipe(map((res: any) => res));
  }

  setHeader() {
    this.requestHeaders = new HttpHeaders({
      'authorization': (Config.getLocalStorageToken() ? Config.getLocalStorageToken() : '')
    });
    this.httpOptions = {
      headers: this.requestHeaders
    };
  }

  finishedSuccessfully() {
    this.notifierService.notify('success', 'عملیات با موفقیت انجام شد.');
  }

  somethingWentWrong() {
    this.notifierService.notify('warning', 'عملیات انجام نشد دوباره تلاش کنید.');
  }
}
