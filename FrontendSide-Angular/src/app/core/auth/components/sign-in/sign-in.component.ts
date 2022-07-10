import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyPattern} from "../../../../shared/tools/MyPattern";
import {Router} from "@angular/router";
import {Config} from "../../../../config/config";
import {NotifierService} from "angular-notifier";
import {AuthService} from "../../../../services/auth.service";
import {CodeTypeDataService} from "../../services/code-type-data.service";
import {CodeType} from "../sign-up/sign-up.component";
declare var $;


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInModel: SignIn;
  form: FormGroup;
  loading = false;
  signInClicked = false;
  wrongAccount = false;
  codeType = CodeType;

  constructor(private router: Router,
              private fb: FormBuilder,
              private codeTypeDataService: CodeTypeDataService,
              private authService: AuthService,
              private notifierService: NotifierService) {
    localStorage.clear();
    this.form = this.fb.group({
      username: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.email)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.password)])
    });
    this.signInModel = new SignIn();
    codeTypeDataService.codeType.emit(CodeType.SIGNUP);
  }

  ngOnInit() {
  }

  signIn() {
    if (this.form.invalid) {
      this.notifierService.notify('error', 'Form is not completed');
      return
    }
    this.wrongAccount = false;
    this.loading = true;
    this.signInClicked = true;
    this.authService.login( this.signInModel).subscribe( (res: any) => {
      console.log(res);
      this.loading = false;
      if (res && res.accessToken) {
        Config.setLocalStorageToken(res.accessToken);
        Config.setUser(res.user);
        this.router.navigateByUrl('/question/list');
      } else if (res && res.errorCode > 0) {
        // this.notifierService.notify('error', res.errorMessage.title);
        this.wrongAccount = true;
      }
    }, error => {
      this.wrongAccount = true;
      this.loading = false;
      console.log(error);
      // this.notifierService.notify('error', error.error.message);
    });
  }

  changeType(codeType){
    this.codeTypeDataService.codeType.emit(codeType);
  }

  openModal(modalId: string) {
    $('#' + modalId).modal('show');
  }
}

export class SignIn {
  username: string;
  password: string;
}

