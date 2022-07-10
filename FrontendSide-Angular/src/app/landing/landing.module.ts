import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing/landing.component';
import {RouterModule} from "@angular/router";
import {LandingRoutingModule} from "./landing-routing.module";
import { AboutUsComponent } from './about-us/about-us.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [LandingComponent, AboutUsComponent],
    imports: [
        CommonModule,
        RouterModule,
        LandingRoutingModule,
        SharedModule,
        NgSelectModule,
        FormsModule
    ]
})
export class LandingModule {
}
