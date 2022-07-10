import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyPattern} from "../../../shared/tools/MyPattern";
import {User} from "../../../models/user/user";
import {NotifierService} from "angular-notifier";
import {Config} from "../../../config/config";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mainUser: User = new User();
  user: User = new User();
  // changePassword: ChangePassword;

  changePasswordForm: FormGroup;
  profileForm: FormGroup;

  submitClicked = false;
  changeProfileClicked = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private notifierService: NotifierService) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.password)]),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.password)]),
      repeatPassword: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.password)])
    });
    this.profileForm = this.formBuilder.group({
      displayName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern(MyPattern.email)]),
    });
    // this.changePassword = new ChangePassword();
    this.user = new User();
    this.user = Config.getLocalStorageUser();
    this.mainUser = Config.getLocalStorageUser();
    if (this.user === null || this.user === undefined) {
      this.user = new User();
      this.mainUser = new User();
    }
  }

  ngOnInit() {
  }

  sendChangePassword() {
    this.submitClicked = true;
    if (this.changePasswordForm.valid) {
      console.log('form is valid');
    } else {
      this.notifierService.notify('warning', 'Form is not completed');
    }
  }

  changeProfile() {
    this.changeProfileClicked = true;
    if (this.profileForm.valid) {
      // this.userService.updateCustomer(this.user).subscribe( (res: any) => {
      //   if (res && res._id) {
      //     this.mainUser = JSON.parse(JSON.stringify(this.user));
      //     Config.setUser(this.user);
      //     $('#profileModal').modal('hide');
      //     this.notifierService.notify('success', 'ویرایش کاربر با موفقیت انجام شد.');
      //   }
      // })
    } else {
      this.notifierService.notify('warning', 'اطلاعات فرم کامل نیست.');
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  openModal() {
    $('#profileModal').modal('show');
  }
}
