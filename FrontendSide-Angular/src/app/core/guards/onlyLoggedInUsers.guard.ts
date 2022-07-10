import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {Config} from "../../config/config";
import {NotifierService} from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private notifierService: NotifierService) {};

  canActivate() {
    if (Config.getLocalStorageToken()) {
      return true;
    } else {
      this.notifierService.notify('warning', 'Dear User, you are not logined in the system. Please do login and then ask your question.');
      return false;
    }
  }
}
