import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';
import {OnlyNumberDirective} from './directives/only-number.directive';
import {OnlyPhoneNumberDirective} from './directives/only-phone-number.directive';
import {ShowOneContainerDirective} from './directives/show-one-container.directive';
import {ShowOneDirective} from './directives/show-one.directive';
import {ShowOneTriggerDirective} from './directives/show-one-trigger.directive';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { PasswordStrengthDirective } from './directives/password-strength.directive';


@NgModule({
  declarations: [UploadFileComponent, DeleteModalComponent, OnlyNumberDirective, OnlyPhoneNumberDirective,
    ShowOneContainerDirective, ShowOneDirective, ShowOneTriggerDirective, ConfirmModalComponent, PrivacyPolicyComponent, PasswordStrengthDirective],
  imports: [
    CommonModule
  ],
    exports: [UploadFileComponent, DeleteModalComponent, OnlyNumberDirective, OnlyPhoneNumberDirective,
        ShowOneContainerDirective, ShowOneTriggerDirective, ShowOneDirective, ConfirmModalComponent, PrivacyPolicyComponent, PasswordStrengthDirective]
})
export class SharedModule { }
