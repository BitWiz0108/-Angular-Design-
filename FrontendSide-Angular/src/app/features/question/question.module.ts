import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionActionComponent } from './components/question-action/question-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { AnswerModule } from '../answer/answer.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionActionComponent,
    QuestionDetailsComponent,
  ],
  imports: [
    AutocompleteLibModule,
    CommonModule,
    QuestionRoutingModule,
    CKEditorModule,
    NgSelectModule,
    FormsModule,
    NgxTagsInputModule,
    AnswerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    InfiniteScrollModule,
    YouTubePlayerModule,
  ],
})
export class QuestionModule {}
