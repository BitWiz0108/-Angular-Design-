import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from "./components/panel/panel.component";
import { MyQuestionsComponent } from "./components/my-questions/my-questions.component";
import { MyNotificationTagsComponent } from './components/my-notification-tags/my-notification-tags.component';
import { MyPresentationComponent } from './components/my-presentation/my-presentation.component';
import { ReportIssueComponent } from './components/report-issue/report-issue.component';

const routes: Routes = [
  {
    path: '', component: PanelComponent, children: [
      { path: 'myNotificationTags', component: MyNotificationTagsComponent },
      { path: 'reportIssue', component: ReportIssueComponent },
      { path: 'myPresentation', component: MyPresentationComponent },
      { path: ':status', component: MyQuestionsComponent },
      { path: 'question', loadChildren: () => import('../question/question.module').then(m => m.QuestionModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
