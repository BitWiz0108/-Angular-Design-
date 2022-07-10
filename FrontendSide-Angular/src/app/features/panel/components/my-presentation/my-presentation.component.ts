import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Question } from '../../../question/models/question';
import { UploadPresentation } from 'src/app/features/question/models/uploadpresentation';
import { UploadPresentationService } from 'src/app/features/question/services/uploadpresentation.service';
import { MyPattern } from '../../../../shared/tools/MyPattern';
import { ActionMode } from 'src/app/models/enums/actionMode';
import { Config } from 'src/app/config/config';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from 'src/app/features/question/services/tag.service';
import QuestionStatus = Question.QuestionStatus;
import Tag = Question.Tag;
import { QuestionService } from 'src/app/features/question/services/question.service';

declare var $;

@Component({
  selector: 'app-my-presentation',
  templateUrl: './my-presentation.component.html',
  styleUrls: ['./my-presentation.component.scss'],
})
export class MyPresentationComponent implements OnInit {
  uploadedFilePath: string;
  uploadedFileName: string;
  uploadPresentation = new UploadPresentation.Action();
  form: FormGroup;
  mode = ActionMode.ADD;
  actionMode = ActionMode;
  loading = false;
  user = Config.getLocalStorageUser();
  showTags = false;
  showEditor = false;
  question = new Question.Action();
  questionCopy = new Question.Action();
  tag: Tag = new Tag();
  tagList: Tag[] = [];
  selectedTagList = [];
  showBody = false;

  keyword = 'title';
  data: Question.Action[] = [];

  constructor(
    private questionService: QuestionService,
    private uploadPresentationService: UploadPresentationService,
    private notifier: NotifierService,
    private fb: FormBuilder,
    private tagService: TagService,
    private router: Router
  ) {
    this.form = fb.group({
      title: new FormControl('', [Validators.required]),
      name: new FormControl(),
      body: new FormControl(),
      yearOfPaper: new FormControl(),
      firstAuthorName: new FormControl(),
      authorCheck: new FormControl(),
      presentationLink: new FormControl('', [
        Validators.pattern(MyPattern.link),
      ]),
      uploadAPresentation: new FormControl(),
      selectedTagList: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getTagList();
    if (this.mode === ActionMode.EDIT) {
      this.getOne();
    } else {
      this.showEditor = true;
    }
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  getTagList() {
    this.tagService.getAll().subscribe((res: Tag[]) => {
      if (res && res.length) {
        this.tagList = res;
        this.showTags = true;
        this.tagList.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );
        // this.tagList.sort(function (a, b) {
        //   return Number(b.title) - Number(a.title);
        // });
      }
    });
  }

  getOne() {
    this.questionService
      .getOne(this.question.id)
      .subscribe((res: Question.Action) => {
        if (res && res.id) {
          this.showTags = false;
          this.question = res;
          this.questionCopy = res;
          for (let item of this.uploadPresentation.tagList) {
            this.selectedTagList.push(item.id);
          }
          setTimeout(() => {
            this.showTags = true;
            this.showEditor = true;
          }, 200);
        }
      });
  }

  setTag(event) {
    this.selectedTagList = [];
    this.uploadPresentation.tagList = [];
    for (const item of event) {
      this.selectedTagList.push(item.id);
      this.uploadPresentation.tagList.push(item);
    }
  }

  createTag() {
    if (this.tag.title.trim() !== '') {
      this.tagService.create(this.tag).subscribe((res: any) => {
        if (res && res.id) {
          this.showTags = false;
          this.tagList.push({ title: this.tag.title, id: res.id } as Tag);
          this.uploadPresentation.tagList.push({
            title: this.tag.title,
            id: res.id,
          } as Tag);
          this.selectedTagList.push(res.id);
          this.tag = new Tag();
          setTimeout(() => {
            this.showTags = true;
          }, 200);
        }
      });
      $('#tagModal').modal('hide');
    }
  }

  onChange(event) {
    this.loading = true;
    let file = event.target.files[0];
    if (file.size < 50 * 1024 * 1024) {
      // Create form data
      const formData = new FormData();
      // Store form name as "file" with file data
      formData.append('file', file, file.name);

      // Make http post request over api
      // with formData as req
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

  changeVideoLink(): boolean {
    if (this.uploadPresentation.presentationLink.split('youtube').length < 2) {
      this.notifier.notify(
        'error',
        'Dear' + this.user.displayName + ', video link should be from youtube.'
      );
      this.uploadPresentation.presentationLink = '';
      return false;
    }
    this.uploadPresentation.presentationLink =
      this.uploadPresentation.presentationLink.replace(
        'www.youtube',
        'www.youtube-nocookie'
      );
    this.uploadPresentation.presentationLink =
      this.uploadPresentation.presentationLink.replace('watch?v=', 'embed/');

    if (this.uploadPresentation.presentationLink.split('=').length > 1) {
      this.uploadPresentation.presentationLink =
        this.uploadPresentation.presentationLink.replace('&', '?');
    }
    return true;
  }

  submit() {
    this.uploadPresentation.uploadAPresentation = this.uploadedFilePath;

    if (
      this.uploadPresentation.presentationLink !== null &&
      this.uploadPresentation.presentationLink !== undefined &&
      this.uploadPresentation.presentationLink.trim() !== '' &&
      this.uploadPresentation.presentationLink.length !== 0
    ) {
      if (!this.changeVideoLink()) {
        return;
      }
    }

    if (
      this.uploadPresentation.title === null ||
      this.uploadPresentation.title === undefined ||
      this.uploadPresentation.title.trim() === ''
    ) {
      this.notifier.notify('error', 'You should enter title first.');
      return;
    }

    if (
      (this.uploadPresentation.presentationLink === null ||
        this.uploadPresentation.presentationLink === undefined ||
        this.uploadPresentation.presentationLink.trim() === '' ||
        this.uploadPresentation.presentationLink.length === 0) &&
      (this.uploadPresentation.uploadAPresentation === null ||
        this.uploadPresentation.uploadAPresentation === undefined ||
        this.uploadPresentation.uploadAPresentation.trim() === '' ||
        this.uploadPresentation.uploadAPresentation.length === 0)
    ) {
      this.loading = false;
      this.notifier.notify(
        'error',
        'Must provide a presentation link or upload a presentation'
      );
      return;
    }

    if (
      this.uploadPresentation.tagList === null ||
      this.uploadPresentation.tagList === undefined ||
      this.uploadPresentation.tagList.length < 3
    ) {
      this.notifier.notify('error', 'You should select at least 3 tags.');
      return;
    }
    this.loading = true;

    this.uploadPresentation.creatorDisplayName = this.user.displayName;
    if (this.mode === ActionMode.ADD) {
      this.uploadPresentationService.create(this.uploadPresentation).subscribe(
        (res: any) => {
          if (res && res.id) {
            $('#closeQuestionModal').click();
            this.notifier.notify(
              'success',
              'Operation has been finished successfully.'
            );
            this.loading = false;
            this.routeToQuestionListWithTagRefresh('/question/list');
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }

  routeToQuestionListWithTagRefresh(path){
    let currentUrl = path;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  questionPreview() {
    this.uploadPresentation.uploadAPresentation = this.uploadedFilePath;

    if (
      this.uploadPresentation.title === null ||
      this.uploadPresentation.title === undefined ||
      this.uploadPresentation.title.trim() === ''
    ) {
      this.notifier.notify('error', 'You should enter title first.');
      return;
    }
    if (
      this.uploadPresentation.body === null ||
      this.uploadPresentation.body === undefined ||
      this.uploadPresentation.body.trim() === '' ||
      this.uploadPresentation.body.length < 20
    ) {
      this.notifier.notify(
        'error',
        'You should describe your paper in the description section with at least 20 characters.'
      );
      return;
    }

    if (
      (this.uploadPresentation.presentationLink === null ||
        this.uploadPresentation.presentationLink === undefined ||
        this.uploadPresentation.presentationLink.trim() === '' ||
        this.uploadPresentation.presentationLink.length === 0) &&
      (this.uploadPresentation.uploadAPresentation === null ||
        this.uploadPresentation.uploadAPresentation === undefined ||
        this.uploadPresentation.uploadAPresentation.trim() === '' ||
        this.uploadPresentation.uploadAPresentation.length === 0)
    ) {
      this.loading = false;
      this.notifier.notify(
        'error',
        'Must provide a presentation link or upload a presentation'
      );
      return;
    }

    if (
      this.uploadPresentation.tagList === null ||
      this.uploadPresentation.tagList === undefined ||
      this.uploadPresentation.tagList.length < 3
    ) {
      this.notifier.notify('error', 'You should select at least 3 tags.');
      return;
    }

    this.question.name = this.question.name;
    this.question.creatorDisplayName = this.user.displayName;
    this.question.creatorId = this.user.id;
    this.showBody = true;
    $('#previewModal').modal('show');
    setTimeout(() => {
      let qBody = document.getElementById('questionBody');
      // let qName = document.getElementById('questionName');
      // let qYearOfPaper = document.getElementById('questionYearOfPaper');
      // let qAutherName = document.getElementById('questionAuthorName');
      // let qFileUploadedName = document.getElementById('questionUploadedFileName');
      // let qYoutubePresentationLink = document.getElementById('questionUtubeLink');
      qBody.innerHTML = this.uploadPresentation.body
        ? this.uploadPresentation.body
        : '';

      // let qname = this.uploadPresentation.name?this.uploadPresentation.name:"";
      // let qyear = this.uploadPresentation.yearOfPaper?this.uploadPresentation.yearOfPaper:"";
      // let qauthername = this.uploadPresentation.firstAuthorName?this.uploadPresentation.firstAuthorName:"";
      // let qYoutubeLink = this.uploadPresentation.presentationLink?this.uploadPresentation.presentationLink:"";

      // qName.innerHTML = " <h6>Journal/Conference: "+qname+"</h6>";
      // qYearOfPaper.innerHTML = " <h6>Year of the Paper: "+qyear +"</h6>";
      // qAutherName.innerHTML = " <h6>First Author's Name: " +qauthername+"</h6>";
      // this.uploadedFileName != null ? qFileUploadedName.innerHTML = "<h6>  File Name: " +this.uploadedFileName+"</h6>" :"";
      // qYoutubePresentationLink.innerHTML = "<h6>Presentation Link: " +qYoutubeLink+"</h6>";
    }, 100);
  }

  selectEvent(item) {
    // do something with selected item
    this.router.navigateByUrl('/panel/question/details?objectId=' + item.id);
  }

  onChangeSearch(val: string) {
    this.questionService
      .getListByTitle(val ? val : ' ')
      .subscribe((res: any) => {
        if (res && res.length) {
          this.data = res;
        }
      });
  }

  onFocused(e) {
    // do something when input is focused
  }
}
