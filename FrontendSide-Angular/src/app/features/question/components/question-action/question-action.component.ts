import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';
import { ActionMode } from '../../../../models/enums/actionMode';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TagService } from '../../services/tag.service';
import { NotifierService } from 'angular-notifier';
import { Config } from '../../../../config/config';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import QuestionStatus = Question.QuestionStatus;
import Tag = Question.Tag;

declare var $;

@Component({
  selector: 'app-question-action',
  templateUrl: './question-action.component.html',
  styleUrls: ['./question-action.component.scss'],
})
export class QuestionActionComponent implements OnInit {
  public Editor = ClassicEditor;
  question = new Question.Action();
  questionCopy = new Question.Action();
  defaultKeywords = [];
  mode = ActionMode.ADD;
  showBody = false;
  tag: Tag = new Tag();
  tagList: Tag[] = [];
  selectedTagList = [];
  showTags = false;
  form: FormGroup;

  user = Config.getLocalStorageUser();
  showEditor = false;
  actionMode = ActionMode;
  loading = false;

  keyword = 'title';
  data : Question.Action[] = [];

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private notifier: NotifierService,
    private router: Router,
    private fb: FormBuilder,
    private tagService: TagService,
    private location: Location
  ) {
    this.question.questionStatus = QuestionStatus.NOPRESENTATIONYET;
    this.mode = this.activatedRoute.snapshot.queryParams.mode;
    this.question.id = this.activatedRoute.snapshot.queryParams.objectId;
    this.form = fb.group({
      title: new FormControl('', [Validators.required]),
      name: new FormControl(''),
      year: new FormControl(''),
      firstAuthorName: new FormControl(''),
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

  
  selectEvent(item) {
    // do something with selected item
    this.router.navigateByUrl('/panel/question/details?objectId=' + item.id);
  }
 
  onChangeSearch(val: string) {  
    this.questionService.getListByTitle(val?val:" ").subscribe((res : any)=>{ 
      if (res && res.length) {
        this.data = res;
      }
    })
    
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
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
          for (let item of this.question.tagList) {
            this.selectedTagList.push(item.id);
          }
          setTimeout(() => {
            this.showTags = true;
            this.showEditor = true;
          }, 200);
        }
      });
  }

  submit() {
    if (this.form.invalid) {
      this.notifier.notify('error', 'Some necessary fields are empty.');
      return;
    } 
    if (
      this.question.body === null ||
      this.question.body === undefined ||
      this.question.body.trim() === '' ||
      this.question.body.length < 20
    ) {
      this.notifier.notify(
        'error',
        'You should describe your question in the description section with at least 20 characters.'
      );
      return;
    }
    this.loading = true;
    if (this.mode === ActionMode.ADD) {
      this.questionService.create(this.question).subscribe(
        (res: any) => {
          if (res && res.id) {
            $('#closeQuestionModal').click();
            this.notifier.notify(
              'success',
              'Your request was successfully added.'
            );
            // this.router.navigateByUrl('/question/list');
            this.routeToQuestionListWithTagRefresh('/question/list');
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    } else {
      this.questionService.update(this.question).subscribe(
        (res: any) => {
          if (res && res.result) {
            $('#closeQuestionModal').click();
            this.notifier.notify(
              'success',
              'Operation has been finished successfully.'
            );
            // this.router.navigateByUrl();
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

  back() {
    this.location.back();
  }

  setTag(event) {
    this.selectedTagList = [];
    this.question.tagList = [];
    for (const item of event) {
      this.selectedTagList.push(item.id);
      this.question.tagList.push(item);
    } 
  }

  createTag() {
    if (this.tag.title.trim() !== '') {
      this.tagService.create(this.tag).subscribe((res: any) => {
        if (res && res.id) {
          this.showTags = false;
          this.tagList.push({ title: this.tag.title, id: res.id } as Tag);
          this.question.tagList.push({
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

  questionPreview() {
    if (this.form.invalid) {
      this.notifier.notify('error', 'Some necessary fields are empty.');
      return;
    } 
    if (
      this.question.body === null ||
      this.question.body === undefined ||
      this.question.body.trim() === '' ||
      this.question.body.length < 2
    ) {
      this.notifier.notify(
        'error',
        'You should describe your question in the body section.'
      );
      return;
    }
    if (
      this.question.tagList === null ||
      this.question.tagList === undefined ||
      this.question.tagList.length < 3
    ) {
      this.notifier.notify('error', 'You should select at least 3 tags.');
      return;
    }
    // if (
    //   this.question.name === null ||
    //   this.question.name === undefined ||
    //   this.question.name.trim() === '' ||
    //   this.question.name.length < 3
    // ) {
    //   this.notifier.notify('error', 'You should enter a valid name.');
    //   return;
    // }
    this.question.name = this.question.name;
    this.question.creatorDisplayName = this.user.displayName;
    this.question.creatorId = this.user.id;
    this.showBody = true;
    $('#previewModal').modal('show');
    setTimeout(() => {
      let qBody = document.getElementById('questionBody');
      let qName = document.getElementById('questionName');
      let qYearOfPaper = document.getElementById('questionYearOfPaper');
      let qAutherName = document.getElementById('questionAuthorName');
      qBody.innerHTML = this.question.body ?this.question.body :"" ;
      let qname = this.question.name?this.question.name:"";
      let qyear = this.question.year?this.question.year:"";
      let qauthername = this.question.firstAuthorName?this.question.firstAuthorName:"";
      qName.innerHTML = " <h6>Journal/Conference: "+qname+"</h6>"  ;
      qYearOfPaper.innerHTML = " <h6>Year of the Paper: "+qyear +"</h6>"; 
      qAutherName.innerHTML = " <h6>First Author's Name: " +qauthername+"</h6>";
    }, 100);
  }

  changeInBody(event: ChangeEvent) {
    this.question.body = event.editor.getData();
  }
}
