import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {PrivacyPolicyComponent} from "../shared/components/privacy-policy/privacy-policy.component"
import {ImprintComponent} from "../shared/components/imprint/imprint.component"

const routes: Routes = [
  {path: '', component: LandingComponent, children: [
      {path: 'question', loadChildren: () => import('../features/question/question.module').then(m => m.QuestionModule)},
      {path: 'home', loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule)},
      {path: 'how-it-works', loadChildren: () => import('../features/how-it-works/how-it-works.module').then(m => m.HowItWorksModule)},

      {path: 'panel', loadChildren: () => import('../features/panel/panel.module').then(m => m.PanelModule)},
      {path: 'auth', loadChildren: () => import('../core/auth/auth.module').then(m => m.AuthModule)},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'privacy-policy', component: PrivacyPolicyComponent},
      {path: 'imprint', component: ImprintComponent},
      {path: '', redirectTo: 'questions', pathMatch: 'full'}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
