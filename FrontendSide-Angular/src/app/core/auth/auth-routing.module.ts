import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./components/auth.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component"
import {VerificationForSignUpComponent} from "./components/verification-for-sign-up/verification-for-sign-up.component";

const routes: Routes = [
  {path: '', redirectTo: 'signIn', pathMatch: 'full'},
  {path: 'signIn' , component: AuthComponent},
  {path: 'signUp' , component: SignUpComponent},
  {path: 'verification' , component: VerificationForSignUpComponent},
  // {path: 'signUp' , component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
