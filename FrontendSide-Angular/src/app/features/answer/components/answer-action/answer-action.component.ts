import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from '../../models/answer';
import { AnswerService } from '../../services/answer.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActionMode } from '../../../../models/enums/actionMode';
import { Config } from '../../../../config/config';
import { NotifierService } from 'angular-notifier';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MyPattern } from '../../../../shared/tools/MyPattern';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { UploadPresentationService } from 'src/app/features/question/services/uploadpresentation.service';


declare var $: any;

@Component({
  selector: 'app-answer-action',
  templateUrl: './answer-action.component.html',
  styleUrls: ['./answer-action.component.scss'],
})
export class AnswerActionComponent implements OnInit {
  @Input() questionId: string;
  @Input() mode = ActionMode.ADD;
  @Input() answer: Answer.Action = new Answer.Action();
  @Output() createdAnswer: EventEmitter<any> = new EventEmitter<any>();

  public Editor2 = ClassicEditor;
  user = Config.getLocalStorageUser();
  showPreview = false;
  form: FormGroup;
  actionMode = ActionMode;
  showBody = false;
  loading = false;
  uploadedFilePath: string;
  uploadedFileName: string;

  constructor(
    private answerService: AnswerService,
    private notifier: NotifierService,
    private uploadPresentationService: UploadPresentationService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      videoLink: new FormControl('', [Validators.pattern(MyPattern.link)]),
      authorCheck: new FormControl(),
      // uploadedPresentation: new FormControl(),
    });
  }

  ngOnInit(): void {
    if(this.mode === this.actionMode.EDIT){
      this.answer.videoLink = "";
    }

    setTimeout(() => {
      this.showBody = true;
    }, 1000);
  }

  onChange(event) {
    this.loading = true;
    let file = event.target.files[0];

    if (file.size < 50 * 1024 * 1024) {
      // Create form data
      const formData = new FormData();
      // Store form name as "file" with file data
      formData.append('file', file, file.name);
      this.uploadPresentationService.uploadFile(formData).subscribe(
        (res: string[]) => {
          if (res && res[0]) {
            this.uploadedFilePath = res[0];
            this.loading = false;

            this.uploadedFileName = file.name;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    } else {
      this.notifier.notify('error', 'Max File Size Exceeds');
    }
  }

  submit() {
    // if (
    //   this.answer.videoLink === null ||
    //   this.answer.videoLink === undefined ||
    //   this.answer.videoLink.trim() === ''
    // ) {
    //   this.notifier.notify(
    //     'error',
    //     'Dear' + this.user.displayName + ', video link is required.'
    //   );
    //   $('#closeAnswerModal').click();
    //   return;
    // }

    this.answer.uploadedPresentation = this.uploadedFilePath;
    this.loading = true;
    ///// for testing purpose i added this line
    // this.answer.isBestAnswer = true;

    if (this.mode === ActionMode.ADD) {
      this.answer.creatorDisplayName = this.user.displayName;
      this.answerService
        .create(this.answer, { questionId: this.questionId })
        .subscribe(
          (res: any) => {
            this.loading = false;
            if (res && res.id) {
              $('#closeAnswerModal').click();
              this.notifier.notify(
                'success',
                'Operation has been finished successfully.'
              );
              this.createdAnswer.emit(res);
            }
          },
          (error) => {
            this.loading = false;
          }
        );
    } else {
      this.answerService
        .updateAnswer(this.answer, { questionId: this.questionId })
        .subscribe(
          (res: any) => {
            this.loading = false;
            if (res && res.result) {
              $('#closeAnswerModal').click();
              this.notifier.notify(
                'success',
                'Operation has been finished successfully.'
              );
              this.createdAnswer.emit(this.answer);
            }
          },
          (error) => {
            this.loading = false;
          }
        );
    }
  }

  preview() {

    this.loading = true;
    this.answer.uploadedPresentation = this.uploadedFilePath;
    if (
      (this.answer.videoLink === null ||
        this.answer.videoLink === undefined ||
        this.answer.videoLink.trim() === '' ||
        this.answer.videoLink.length === 0) &&
      (this.answer.uploadedPresentation === null ||
        this.answer.uploadedPresentation === undefined ||
        this.answer.uploadedPresentation.trim() === '' ||
        this.answer.uploadedPresentation.length === 0)
    ) {
      this.loading = false;
      this.notifier.notify(
        'error',
        'You must either provide the YouTube link to your presentation or upload your presentation file.'
      );
      return;
    }
    if (
      this.answer.videoLink !== null &&
      this.answer.videoLink !== undefined &&
      this.answer.videoLink.trim() !== '' &&
      this.answer.videoLink.length !== 0
    ) {
      if (!this.changeVideoLink()) {
        this.loading = false;
        return;
      }
    }
    if (this.form.invalid) {
      this.loading = false;
      this.notifier.notify('error', 'The video link is not valid.');
      return;
    }
    if (this.answer.videoLink) {
      var iframe =
        '<iframe  height="50vh" *ngIf="answer.videoLink" style="height: 50vh!important;" width="100%" src=\'' +
        this.answer.videoLink +
        "' allowfullscreen></iframe>";
      $('#video-section').html('');
      $('#video-section').append(iframe);
      // this.showPreview = true;
      this.loading = false;
    }
    // else {
    this.loading = true;
    $('#previewModal').modal('show');
    this.showPreview = true;
    this.loading = false;
    // }
    // else {
    //   this.notifier.notify('error', 'Please insert your video link.');
    // }
    document.getElementById('answer-body').innerHTML = this.answer.body
      ? this.answer.body
      : '';
  }

  changeVideoLink(): boolean {
    if (this.answer.videoLink.split('youtube').length < 2) {
      this.notifier.notify(
        'error',
        'Dear ' + this.user.displayName + ', video link should be from youtube.'
      );
      this.answer.videoLink = '';
      return false;
    }
    this.answer.videoLink = this.answer.videoLink.replace(
      'www.youtube',
      'www.youtube-nocookie'
    );
    this.answer.videoLink = this.answer.videoLink.replace('watch?v=', 'embed/');

    if (this.answer.videoLink.split('=').length > 1) {
      this.answer.videoLink = this.answer.videoLink.replace('&', '?');
    }
    return true;
  }

  changeInBody(event: ChangeEvent) {
    if (
      event.editor.getData() === null ||
      event.editor.getData() === undefined ||
      event.editor.getData().trim() === '' ||
      event.editor.getData().length > 250
    ) {
      this.notifier.notify(
        'error',
        'You should enter answer body with 1 to 250 characters.'
      );
      return;
    }
    this.answer.body = event.editor.getData();
  }

  cancel() {
    this.createdAnswer.emit(null);
  }
}
