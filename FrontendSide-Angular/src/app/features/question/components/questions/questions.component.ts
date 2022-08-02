import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { Config } from '../../../../config/config';
import { NotifierService } from 'angular-notifier';
import { QuestionService } from '../../services/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PaginationInstance } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeService } from '../../../../services/youtube.service';

declare var $;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  public Editor = ClassicEditor;
  questionList: Question.Action[] = [];
  mainQuestionList: Question.Action[] = [];
  term = '';
  token: string;
  selectedTagList = [];

  public config: PaginationInstance = {
    id: 'customerList',
    itemsPerPage: 10,
    currentPage: 1,
  };
  totalCount = 0;
  loading = false;
  suggestedVideo = [];

  constructor(
    private router: Router,
    private notifier: NotifierService,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private youtubeService: YoutubeService,
    private cd: ChangeDetectorRef
  ) {
    this.token = Config.getLocalStorageToken();
  }

  ngOnInit(): void {
    this.cd.detectChanges();
    this.activatedRoute.queryParams.subscribe((query: any) => {
      this.config.currentPage = query.page ? query.page : 1;
      this.config.itemsPerPage = query.size ? query.size : 10;
      this.term = query.term ? query.term : '';
      this.selectedTagList = query.selectedTagList
        ? query.selectedTagList.split(',')
        : [];
      this.totalCount = 0;
      this.getQuestionList('',1);

    });
  }

  suggestVideos() {
    if (this.term) {
      this.youtubeService.search(this.term).subscribe(
        (data: any) => {
          this.loading = false;
          if (data && data.items && data.items) {
            this.suggestedVideo = data.items;
          } else {
            this.showNotification();
          }
        },
        (error) => {
          console.log(error);
          this.showNotification();
        }
      );
    } else {
      this.showNotification();
    }
  }

  getQuestionList(liked: string,defaultPage:number) {
    this.loading = true;
    this.questionList = [];
    this.totalCount = 0;
    if(defaultPage === 0){
    this.config.currentPage = 1;
    }
    this.questionService
      .getAllPageable(
        this.term,
        this.selectedTagList,
        this.config.currentPage,
        this.config.itemsPerPage,
        this.totalCount,
        liked
      )
      .subscribe((res: any) => {

        if (res && res.content && res.content.length) {
          this.loading = false;
          this.totalCount = res.totalElements;
          this.questionList = res.content;
        } else {
          this.suggestVideos();
        }
      });
  }

  showNotification() {
    this.loading = false;
    if (this.term) {
      //this.notifier.notify('warning', 'Unfortunately, we couldn\'t find any question including your keywords. There is either no question including your keywords or your keywords are too general...');
    } else {
      //this.notifier.notify('warning', 'There is no question for showing, Be the first One who asks a Question.');
    }
  }

  onPageChange(number: number) {
    console.log('Going to reload page');
    this.config.currentPage = number;
    this.router.navigateByUrl(
      '/question/list?term=' +
        this.term +
        '&selectedTagList=' +
        this.selectedTagList +
        '&page=' +
        number +
        '&size=10'
    );
  }
}
