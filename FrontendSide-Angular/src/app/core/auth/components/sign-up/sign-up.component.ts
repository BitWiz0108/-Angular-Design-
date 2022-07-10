import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifierService} from "angular-notifier";
import {UserService} from "../../../../services/user.service";
import {MyPattern} from "../../../../shared/tools/MyPattern";
import {AuthService} from "../../../../services/auth.service";
import {CodeTypeDataService} from "../../services/code-type-data.service";
declare var $;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', "../sign-in/sign-in.component.scss"]
})
export class SignUpComponent implements OnInit {

  emailForm: FormGroup;
  loading = false;

  signUpClicked = false;
  email: string;
  showSuccessMessage = false;
  codeType = CodeType.SIGNUP;
  codeTypeEnum = CodeType;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private notifierService: NotifierService,
              private activatedRoute: ActivatedRoute,
              private codeTypeDataService: CodeTypeDataService) {
    localStorage.clear();
    this.emailForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.email)]),
    });
  }

  ngOnInit() {
    this.codeTypeEnum = this.activatedRoute.snapshot.queryParams.codeType;
    this.codeTypeDataService.codeType.subscribe( (res) => {
      this.codeType = res;
    });
  }

  sendEmail() {
    this.loading = true;
    this.authService.sendEmail(this.email, this.codeType).subscribe( (res: any) => {
      console.log(res);
      this.loading = false;
      if (res) {
        this.showSuccessMessage = true;
      } else {
        this.notifierService.notify('error','Something went wrong, Please try again.');
      }
    }, error => {
      this.loading = false;
    });
  }

  openModal(modalId: string) {
    $('#' + modalId).modal('show');
  }
}

export class SignUp {
  email: string;
  displayName: string;
  password: string;
  code: string
}
export enum CodeType {
  SIGNUP = 'SIGNUP' as any,
  FORGET_PASSWORD = 'FORGET_PASSWORD' as any
}
