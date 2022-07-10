import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OnlyLoggedInUsersGuard} from "./core/guards/onlyLoggedInUsers.guard";

const routes: Routes = [
  {path: '', redirectTo: 'question/list', pathMatch: 'full'},
  {path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
  // {path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
  // {path: 'panel', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, paramsInheritanceStrategy: 'always', relativeLinkResolution: 'legacy', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
