import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionsComponent} from "./components/questions/questions.component";
import {QuestionActionComponent} from "./components/question-action/question-action.component";
import {OnlyLoggedInUsersGuard} from "../../core/guards/onlyLoggedInUsers.guard";
import {QuestionDetailsComponent} from "./components/question-details/question-details.component";

const routes: Routes = [
  {path: 'list', component: QuestionsComponent},
  {path: 'action', component: QuestionActionComponent,
    canActivate: [OnlyLoggedInUsersGuard]},
  {path: 'details', component: QuestionDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
