import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowItWorksRoutingModule } from './how-it-works-routing.module';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';


@NgModule({
  declarations: [HowItWorksComponent],
  imports: [
    CommonModule,
    HowItWorksRoutingModule
  ]
})
export class HowItWorksModule { }
