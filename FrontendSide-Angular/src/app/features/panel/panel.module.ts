import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { MyQuestionsComponent } from './components/my-questions/my-questions.component';
import { MyAnswersComponent } from './components/my-answers/my-answers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from './components/panel/panel.component';
import { MyNotificationTagsComponent } from './components/my-notification-tags/my-notification-tags.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { MyPresentationComponent } from './components/my-presentation/my-presentation.component';
import { ReportIssueComponent } from './components/report-issue/report-issue.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    MyQuestionsComponent,
    MyAnswersComponent,
    MyNotificationTagsComponent,
    PanelComponent,
    MyPresentationComponent,
    ReportIssueComponent,
  ],
  imports: [
    AutocompleteLibModule,
    CommonModule,
    PanelRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    NgxTagsInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [MyPresentationComponent],
})
export class PanelModule {}
