import { Injectable } from '@angular/core';
import {ServiceBaseService} from "./service-base.service";
import {HttpClient} from "@angular/common/http";
import {SignIn} from "../core/auth/components/sign-in/sign-in.component";
import {CodeType, SignUp} from "../core/auth/components/sign-up/sign-up.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ServiceBaseService{

  constructor(public http: HttpClient) {
    super(http);
    this.prefix = 'auth';
    this.suffix = '';
  }

  login(signIn: SignIn) {
    return super.postService('/login', signIn);
  }

  register(signUp: SignUp) {
    return super.postService('/signup', signUp);
  }

  changePassword(signUp: SignUp) {
    return super.putService('/change-password', signUp);
  }

  getEmailAddressByCode(code) {
    return super.getService('/get-verification-details-by-code', {code});
  }

  sendEmail(email: string, codeType: CodeType) {
    return super.getService('/send-email', {email, codeType});
  }
}
