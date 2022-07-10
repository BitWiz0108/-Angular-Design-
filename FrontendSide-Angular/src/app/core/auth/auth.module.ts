import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthRoutingModule} from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthComponent } from './components/auth.component';
import {CountdownModule} from "ngx-countdown";
import {SharedModule} from "../../shared/shared.module";
import { VerificationForSignUpComponent } from './components/verification-for-sign-up/verification-for-sign-up.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, AuthComponent, VerificationForSignUpComponent],
    imports: [
        CommonModule,
        FormsModule,
        CountdownModule,
        HttpClientModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SharedModule,
    ]
})
export class AuthModule { }
