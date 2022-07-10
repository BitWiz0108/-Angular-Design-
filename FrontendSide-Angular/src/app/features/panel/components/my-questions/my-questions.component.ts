import { Component, OnInit } from '@angular/core';
import {Question} from "../../../question/models/question";
import {PaginationInstance} from "ngx-pagination";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NotifierService} from "angular-notifier";
import {QuestionService} from "../../../question/services/question.service";
import {Config} from "../../../../config/config";
import {ActivatedRoute, Router} from "@angular/router";
import {AnswerService} from "../../../answer/services/answer.service";
import {esLocale} from "ngx-bootstrap/chronos";

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {
  public Editor = ClassicEditor;
  questionList: Question.Action[] = [];
  mainQuestionList: Question.Action[] = [];
  term = '';
  token: string;
  // showQuestions = false;

  public config: PaginationInstance = {
    id: 'customerList',
    itemsPerPage: 10,
    currentPage: 1
  };
  page = 1;
  totalCount = 0;
  loading = false;
  status = '';

  constructor(private notifier: NotifierService,
              private activatedRoute: ActivatedRoute,
              private answerService: AnswerService,
              private router: Router,
              private questionService: QuestionService) {
    this.token = Config.getLocalStorageToken();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (param) => {
      this.status = param.status;
      this.term = '';
      this.getList(0);
    })
  }

  search() {
    this.totalCount = 0;
    this.getList(0);
  }

  getList(currentPage) {
    this.questionList = [];
    this.loading = true;
    this.config.currentPage = currentPage;
    this.page = currentPage;
    if (this.status === 'myAnswers') {
      this.answerService.getMyPage(this.term, this.config.currentPage, this.config.itemsPerPage, this.totalCount)
        .subscribe((res: any) => { 
          this.loading = false;
          if (res && res.content && res.content.length) {
            if (this.config.currentPage === 1) {
              this.totalCount = res.totalElements;
              this.config.currentPage = res.page
            }
            this.questionList = res.content;
          } else {
            // this.notifier.notify('warning', 'Dear user, you have no answer to the questions.');
          }
        });
    } else {
      this.questionService.getMyPage(this.term, this.config.currentPage, this.config.itemsPerPage, this.totalCount)
        .subscribe((res: any) => { 
          this.loading = false;
          if (res && res.content && res.content.length) {
            this.totalCount = res.totalElements;
            this.config.currentPage = res.page
            this.questionList = res.content;
          } else {
            if (this.term) {
              //this.notifier.notify('warning', 'Unfortunately, we couldn\'t find any question including your keywords. There is either no question including your keywords or your keywords are too general...\n');
            } else {
              //this.notifier.notify('warning', 'There is no question for showing.');
            }
          }
        });
    }
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
    this.getList(this.config.currentPage);
  }

  navigate(item: Question.Action) {
    if (this.status === 'myAnswers') {
      this.router.navigateByUrl('/panel/question/details?objectId=' + item.id + '&mode=myAnswer');
    } else {
      this.router.navigateByUrl('/panel/question/details?objectId=' + item.id);
    }
  }
}
