import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { ReportIssue } from '../../models/reportIssue';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute,Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { ReportService } from '../../services/report.service';
import { Config } from '../../../../config/config';
import { AnswerService } from '../../../answer/services/answer.service';
import { Answer } from '../../../answer/models/answer';
import { ActionMode } from '../../../../models/enums/actionMode';
import { Location } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { PaginationInstance } from 'ngx-pagination';
import { CommentService } from '../../services/comment.service';
import { UploadPresentationService } from '../../services/uploadpresentation.service';
import { CookieService } from 'ngx-cookie-service';
import {
  NgcCookieConsentConfig,
  NgcCookieConsentService,
} from 'ngx-cookieconsent';

declare var $;

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss'],
})
export class QuestionDetailsComponent implements OnInit {
  issue: string;
  reportIssueCheck;
  public Editor = ClassicEditor;
  question: Question.Action = new Question.Action();
  showBody = false;
  showAnswerForm = false;
  user = Config.getLocalStorageUser();
  selectedAnswerForDelete = '';
  selectedAnswer: Answer.Action = new Answer.Action();
  mode = ActionMode.ADD;
  actionMode = ActionMode;
  hasBestAnswer = false;
  answerList: Answer.Action[] = [];
  commentsList = [];
  reportIssue = new ReportIssue.Action();
  public commentsConfig: PaginationInstance = {
    id: 'commentsList',
    itemsPerPage: 3,
    currentPage: 1,
  };

  public config: PaginationInstance = {
    id: 'customerList',
    itemsPerPage: 2,
    currentPage: 1,
  };
  page = 1;
  commentsPage = 1;
  totalCount = 0;
  totalCommentsCount = 0;
  canAnswer = true;
  deleteLoading = false;
  showMyAnswer = false;
  borderColor = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportIssueService: ReportService,
    private answerService: AnswerService,
    private commentService: CommentService,
    private notifier: NotifierService,
    private location: Location,
    private uploadPresentationService: UploadPresentationService,
    private questionService: QuestionService,
    private cookieService: CookieService,
    private ccService: NgcCookieConsentService,
    private router: Router
  ) {
    this.question.id = activatedRoute.snapshot.queryParams.objectId;
    this.showMyAnswer = activatedRoute.snapshot.queryParams.mode === 'myAnswer';
  }

  cookieConfig: NgcCookieConsentConfig = {
    cookie: {
      domain: 'localhost', // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
    },
    palette: {
      popup: {
        background: '#000',
      },
      button: {
        background: '#f1d600',
      },
    },
    theme: 'edgeless',
    type: 'opt-out',
  };

  ngOnInit(): void {
    if (this.question.id !== undefined) {
      this.reportIssueService
        .getOne(this.question.id)
        .subscribe((res: ReportIssue.Action) => {
          if (res) {
            if (res.id) {
              if (res.id != '') {
                this.reportIssueCheck = true;
              }
            } else {
              this.reportIssueCheck = false;
            }
          } else {
            this.reportIssueCheck = false;
          }
        });

      this.questionService
        .forShow(this.question.id)
        .subscribe((res: Question.Action) => {
          if (res && res.id) {
            this.question = res;
            this.showBody = true;
            this.borderColor =
              this.question.questionStatus == 'WITHPRESENTATION' ? true : false;
            this.question.questionStatus == 'WITHPRESENTATION' ? true : false;
            document.getElementById('questionBody').innerHTML =
              this.question.body;
            if (
              this.question.answerList.findIndex(
                (a) => a.isBestAnswer === true
              ) !== -1
            ) {
              this.hasBestAnswer = true;
            }
            if (this.user && this.user.id) {
              if (
                this.question.answerList.findIndex(
                  (a) => a.creatorId === this.user.id
                ) !== -1
              ) {
                this.canAnswer = false;
              }
            } else {
              this.canAnswer = false;
            }
            this.question.answerList.sort(function (a, b) {
              return Number(b.isBestAnswer) - Number(a.isBestAnswer);
            });
            // this.onScroll();
            if (res.answerList && res.answerList.length) {
              this.totalCount = res.answerList.length;
              var currentPage = 1;
              // if (this.showMyAnswer) {
              //   currentPage =
              //     (res.answerList.findIndex(
              //       (a) => a.creatorId === this.user.id
              //     ) +
              //       1) /
              //     this.config.itemsPerPage;
              // }
              this.sortAnswerAndCreateVideos(currentPage.toFixed());
            }
            this.sortComments(1);
          }
        });
    }
  }

  sortAnswerAndCreateVideos(currentPage) {
    this.answerList = [];
    this.config.currentPage = currentPage;
    this.page = currentPage;
    var index = -1;
    for (
      var i = (currentPage - 1) * this.config.itemsPerPage;
      i < currentPage * this.config.itemsPerPage;
      i++
    ) {
      if (
        this.question.answerList[i] &&
        this.question.answerList[i].videoLink
      ) {
        this.answerList.push(this.question.answerList[i]);
        setTimeout(() => {
          index++;
          if (this.answerList[index].videoLink) {
            if (this.cookieService.get('cookieconsent_status') === 'allow') {
              var iframe =
                '<iframe  height="50vh" style="height: 50vh!important;" width="100%" id=\'frame-' +
                this.answerList[index].id +
                "' src='" +
                this.answerList[index].videoLink +
                "' allowfullscreen></iframe>";
              $('#video-' + this.answerList[index].id).append(iframe);
              document.getElementById(
                'answer-body-' + this.answerList[index].id
              ).innerHTML = this.answerList[index].body
                ? this.answerList[index].body
                : '';
            } else {
              this.ccService.init(this.cookieConfig);
            }
          }
        }, 1 * 300);
      }

      if (
        this.question.answerList[i] &&
        this.question.answerList[i].uploadedPresentation
      ) { 
        this.answerList.push(this.question.answerList[i]);
        if (i % 2 == 0) {
          index++;
        }
 
        if (Math.abs(i % 2) == 1) { 
          setTimeout(() => { 
            if (this.answerList[i]) {
              var splitPath =
                this.answerList[i - 1].uploadedPresentation.split('\\');
              var uploadedFileName = splitPath[3];
              $('#upload-file-' + this.answerList[i - 1].id).append(
                uploadedFileName
              );
              document.getElementById(
                'answer-body-' + this.answerList[i - 1].id
              ).innerHTML = this.answerList[i - 1].body
                ? this.answerList[i - 1].body
                : '';
            } else {
              var splitPath =
                this.question.answerList[i - 1].uploadedPresentation.split(
                  '\\'
                );
              var uploadedFileName = splitPath[3];
              $('#upload-file-' + this.question.answerList[i - 1].id).append(
                uploadedFileName
              );
              document.getElementById(
                'answer-body-' + this.question.answerList[i - 1].id
              ).innerHTML = this.question.answerList[i - 1].body
                ? this.question.answerList[i - 1].body
                : '';
            }
          }, 1 * 300);
        } else { 
          setTimeout(() => {
            var splitPath =
              this.answerList[index].uploadedPresentation.split('\\');
            var uploadedFileName = splitPath[3];
            $('#upload-file-' + this.answerList[index].id).append(
              uploadedFileName
            );
            document.getElementById(
              'answer-body-' + this.answerList[index].id
            ).innerHTML = this.answerList[index].body
              ? this.answerList[index].body
              : '';
          }, 1 * 200);
        }
      }
    }
  }

  sortComments(currentPage) {
    this.totalCommentsCount = this.question.commentList.length;
    this.commentsList = [];
    this.commentsConfig.currentPage = currentPage;
    this.commentsPage = currentPage;
    var index = -1;
    for (
      var i = (currentPage - 1) * this.commentsConfig.itemsPerPage;
      i < currentPage * this.commentsConfig.itemsPerPage &&
      i < this.question.commentList.length;
      i++
    ) {
      this.commentsList.push(this.question.commentList[i]);
    }
  }

  newAnswer(event: any) {
    if (event && event.id) {
      this.canAnswer = false;
      if (this.question.answerList.findIndex((a) => a.id === event.id) !== -1) {
        this.question.answerList.find((a) => a.id === event.id).body =
          event.body;
        this.question.answerList.find((a) => a.id === event.id).videoLink =
          event.videoLink;
      } else {
        this.question.answerList.push(event);
        this.totalCount = this.question.answerList.length;
      }
      this.onPageChange(this.page);
      this.showAnswerForm = false;
      this.selectedAnswer = new Answer.Action();

      this.question.questionStatus = Question.QuestionStatus.WITHPRESENTATION;
      this.borderColor = true;
    } else {
      this.onPageChange(this.page);
      this.showAnswerForm = false;
      this.selectedAnswer = new Answer.Action();
    }
    this.mode = ActionMode.ADD;
  }

  selectingAnswer(id: string) {
    this.questionService
      .updateBestAnswer(this.question.id, id)
      .subscribe((res: any) => {
        if (res && res.result) {
          this.question.answerList.find(
            (answer) => answer.id === id
          ).isBestAnswer = true;
          this.answerList.find((answer) => answer.id === id).isBestAnswer =
            true;
          this.hasBestAnswer = true;
        }
      });
  }

  updateAnswerUsefulCount(id: string) {
    if (this.user && this.user.id) {
      this.answerService
        .updateUsefulCount(this.question.id, id)
        .subscribe((res: any) => {
          if (res && res.result) {
            // this.question.answerList.find(answer => answer.id === id).usefulCount++;
            this.answerList.find((answer) => answer.id === id).usefulCount++;
          } else {
            // this.question.answerList.find(answer => answer.id === id).usefulCount--;
            this.answerList.find((answer) => answer.id === id).usefulCount--;
          }
        });
    } else {
      this.notifier.notify(
        'error',
        'Please sign in to be able to mark an answer as useful.'
      );
    }
  }

  updateQuestionUsefulCount() {
    if (this.user && this.user.id) {
      this.questionService
        .updateUsefulCount(this.question.id)
        .subscribe((res: any) => {
          if (res && res.result) {
            this.question.usefulCount++;
          } else {
            this.question.usefulCount--;
          }
        });
    } else {
      this.notifier.notify(
        'error',
        'Please sign in to be able to mark an answer as useful.'
      );
    }
  }

  addNewAnswer() {
    if (Config.getLocalStorageUser() && Config.getLocalStorageUser().id) {
      this.mode = ActionMode.ADD;
      this.showAnswerForm = true;
      window.scrollTo(0, 400);
    } else {
      this.notifier.notify(
        'warning',
        'Please sign in to answer the questions.'
      );
    }
  }

  addNewComment() {
    if (Config.getLocalStorageUser() && Config.getLocalStorageUser().id) {
      if (this.question.commentList === undefined) {
        this.question.commentList = [];
      }
      if (
        this.question.commentToBeAdd === null ||
        this.question.commentToBeAdd === undefined ||
        this.question.commentToBeAdd.trim() === '' ||
        this.question.commentToBeAdd.length > 250
      ) {
        this.notifier.notify(
          'error',
          'Your comment can have a maximum of 250 characters.'
        );
        return;
      }

      if (
        this.question.commentToBeAdd !== undefined &&
        this.question.commentToBeAdd !== ''
      ) {
        var quesComment: Question.Comment = new Question.Comment();
        quesComment.creator = this.user;
        quesComment.userName = this.user.displayName;
        quesComment.description = this.question.commentToBeAdd;
        quesComment.creatorId = this.user.id;
        quesComment.questionId = this.question.id;
        quesComment.systemCreationDate = new Date();
        this.question.commentToBeAdd = '';
        this.question.commentList.push(quesComment);
        this.sortComments(1);

        this.commentService.create(quesComment).subscribe(
          (res: any) => {
            if (res && res.id) {
              this.notifier.notify(
                'success',
                'Your comment was successfully added.'
              );
            }
          },
          (error) => {}
        );
      }
    } else {
      this.notifier.notify(
        'warning',
        'Please sign in to comment on the questions.'
      );
    }
  }

  downloadVideo(videoPath: string) {
    this.uploadPresentationService.getFileBytes(videoPath).then((res) => {
      if (res.status === 200) {
        if (res.status) {
          var url = window.URL.createObjectURL(new Blob([res.data]));
          var link = document.createElement('a');
          link.href = url;
          var splitPath = videoPath.split('\\');
          link.setAttribute('download', splitPath[3]);
          link.click();
        }
      }
    });
  }

  editAnswer(item) {
    this.mode = ActionMode.EDIT;
    this.selectedAnswer = item;
    this.showAnswerForm = true;
    window.scrollTo(0, 400);
  }

  areYouSure(id: string) {
    this.selectedAnswerForDelete = id;
    $('#areYouSureModal').modal('show');
  }

  doDelete() {
    this.deleteLoading = true;
    if (this.selectedAnswerForDelete !== 'question') {
      this.answerService
        .deleteOne(this.selectedAnswerForDelete, {
          questionId: this.question.id,
        })
        .subscribe(
          (res: any) => {
            this.deleteLoading = false;
            if (res && res.result) {
              this.question.answerList = this.question.answerList.filter(
                (a) => a.id !== this.selectedAnswerForDelete
              );
              this.answerList = [];
              if (
                this.question.answerList.findIndex(
                  (a) => a.creatorId === this.user.id
                ) !== -1
              ) {
                this.canAnswer = false;
              } else {
                this.canAnswer = true;
              }
              $('#closeAreYouSureModal').click();
             
              setTimeout(() => {
                if (this.question.answerList.length % 2 == 0) {
                  this.onPageChange(this.page - 1);
                  this.totalCount = this.question.answerList.length;
                } else {
                  this.onPageChange(this.page);
                }
              }, 500);
              this.selectedAnswerForDelete = '';
              if (this.question.answerList.length === 0) {
                this.question.questionStatus =
                  Question.QuestionStatus.NOPRESENTATIONYET;
                this.borderColor = false;
              }
              this.routeToQuestionListWithTagRefresh();
              this.reportIssueCheck = false;
            }
          },
          (error) => {
            this.deleteLoading = false;
          }
        );
    } else {
      this.questionService.deleteOne(this.question.id).subscribe(
        (res: any) => {
          this.deleteLoading = false;
          if (res && res.result) {
            $('#closeAreYouSureModal').click();
            this.location.back();
          }
        },
        (error) => {
          this.deleteLoading = false;
        }
      );
    }
  }

  
  routeToQuestionListWithTagRefresh(){
    let currentUrl ='/question/details?objectId=' +this.question.id;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(currentUrl);
  }

  createReportIssueHandle(issueReport) {
    this.reportIssue.issue = issueReport;
    this.reportIssue.paperId = this.question.id;
    this.reportIssue.videoId = this.question.answerList[0].id;
    this.reportIssue.title = this.question.title;
    this.reportIssue.creatorDisplayName = this.question.creatorDisplayName;
    this.reportIssue.questionStatus = this.question.questionStatus;
    this.reportIssue.seen = this.question.seen;
    this.reportIssue.usefulCount = this.question.usefulCount;
    this.reportIssue.date = this.question.systemCreationDate;
    this.reportIssue.tagList = this.question.tagList;

    if (this.mode === ActionMode.ADD) {
      this.reportIssueService.create(this.reportIssue).subscribe(
        (res: any) => {
          if (res && res.id) {
            this.reportIssueCheck = true;
            $('#closeReportModel').click();
            this.notifier.notify(
              'success',
              'Your report against presentation was successfully added.'
            );
            // this.router.navigateByUrl('/question/list');
          }
        },
        (error) => {
          // this.loading = false;
        }
      );
    }
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
    this.sortAnswerAndCreateVideos(this.config.currentPage);
  }

  onCommentsPageChange(number) {
    this.commentsConfig.currentPage = number;
    this.sortComments(number);
  }

  checkDeletePermission() {
    if (
      this.user.id === this.question.creatorId &&
      this.question.answerList.length === 0
    ) {
      return true;
    }

    let check = false;
    if (
      this.user.id === this.question.creatorId &&
      this.question.answerList.length > 0
    ) {
      for (const answerListItem of this.question.answerList) {
        if (this.user.id === answerListItem.creatorId) {
          check = true;
        } else {
          return (check = false);
        }
      }
      return check;
    }
    return false;
  }
}
