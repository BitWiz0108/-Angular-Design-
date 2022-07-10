import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ServiceBaseService } from "./service-base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceBaseService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefix = 'users'
  }

  checkEmailExist(email: string) {
    return super.getService('/check-mail-exist?email=' + email);
  }
}
