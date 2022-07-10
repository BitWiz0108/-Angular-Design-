import {Injectable} from "@angular/core";
import {NotifierService} from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class NotifierMessages {
  constructor(public notifierService: NotifierService) {
  }

  updateFinishedSuccessfully() {
    this.notifierService.notify('success', 'ویرایش با موفقیت به پایان رسید.');
  }

}
