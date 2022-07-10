import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {NotifierService} from "angular-notifier";
import {MyPattern} from "../../../../shared/tools/MyPattern";
import {Config} from "../../../../config/config";
import {CodeType, SignUp} from "../sign-up/sign-up.component";
declare var $;

@Component({
  selector: 'app-verification-for-sign-up',
  templateUrl: './verification-for-sign-up.component.html',
  styleUrls: ['./verification-for-sign-up.component.scss', "../sign-in/sign-in.component.scss"]
})
export class VerificationForSignUpComponent implements OnInit {

  signUpForm: FormGroup;
  repeatPassword: string;
  signUp = new SignUp();

  loading = false;
  signUpClicked = false;

  codeType = CodeType.SIGNUP;
  codeTypeEnum = CodeType;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private notifierService: NotifierService) {
    localStorage.clear();
    this.signUpForm = this.fb.group({
      displayName: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.displayName)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.password)]),
      repeatPassword: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.password)])
    });
  }

  ngOnInit() {
    this.signUp.code = this.activatedRoute.snapshot.queryParams.code;
    if (this.signUp.code !== null && this.signUp.code !== undefined) {
      this.getEmailAddressByCode();
    }
  }

  getEmailAddressByCode() {
    this.authService.getEmailAddressByCode(this.signUp.code).subscribe( (res: any) => {
      console.log(res);
      if (res) {
        this.signUp.email = res.email;
        this.codeType = res.codeType;
        if (res.codeType === this.codeTypeEnum.FORGET_PASSWORD) {
          this.signUp.displayName = res.displayName;
        }
      }
    });
  }

  signUpFunction() {
    if (this.repeatPassword !== this.signUp.password) {
      this.notifierService.notify('error', 'Password and confirm password is not equals.');
      return;
    }
    this.loading = true;
    this.signUpClicked = true;
    if (this.codeType === CodeType.SIGNUP) {
      this.authService.register(this.signUp).subscribe((res: any) => {
        console.log(res);
        this.loading = false;
        if (res && res.accessToken) {
          $('#forgetPassword').modal('hide');
          Config.setLocalStorageToken(res.accessToken);
          Config.setUser(res.user);
          this.router.navigateByUrl('/question/list');
        } else if (res && res.errorCode > 0) {
          this.notifierService.notify('error', 'Something went wrong try again please.');
        }
      }, error => {
        this.loading = false;
        console.log(error);
        this.notifierService.notify('error', error.error.message);
      });
    } else {
      this.authService.changePassword(this.signUp).subscribe((res: any) => {
        console.log(res);
        this.loading = false;
        if (res && res.accessToken) {
          $('#forgetPassword').modal('hide');
          Config.setLocalStorageToken(res.accessToken);
          Config.setUser(res.user);
          this.router.navigateByUrl('/question/list');
        } else if (res && res.errorCode > 0) {
          this.notifierService.notify('error', 'Something went wrong try again please.');
        }
      }, error => {
        this.loading = false;
        console.log(error);
        this.notifierService.notify('error', error.error.message);
      });
    }
  }

  openModal(modalId: string) {
    $('#' + modalId).modal('show');
  }
}
