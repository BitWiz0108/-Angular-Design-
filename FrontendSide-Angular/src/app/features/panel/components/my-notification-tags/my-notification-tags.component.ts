import { Component, OnInit } from '@angular/core';
import { Question } from "../../../question/models/question";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotifierService } from "angular-notifier";
import { Config } from "../../../../config/config";
import { TagService } from '../../../question/services/tag.service';
import Tag = Question.Tag;
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user/user';

@Component({
  selector: 'app-my-notification-tags',
  templateUrl: './my-notification-tags.component.html',
  styleUrls: ['./my-notification-tags.component.scss']
})
export class MyNotificationTagsComponent implements OnInit {
  public Editor = ClassicEditor;
  questionList: Question.Action[] = [];
  mainQuestionList: Question.Action[] = [];
  term = '';
  token: string;
  tag: Tag = new Tag();
  tagList: Tag[] = [];
  selectedTagList = [];
  loading = true;
  user: User;

  constructor(private notifier: NotifierService,
    private userService: UserService,
    private tagService: TagService) {
    this.token = Config.getLocalStorageToken();
    this.user = Config.getLocalStorageUser();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getTagList();
    if (this.user.activatedTags !== null && this.user.activatedTags !== undefined) {
      for (let item of this.user.activatedTags) {
        this.selectedTagList.push(item.id.toString());
      }
    }
    this.loading = false;
  }

  getTagList() {
    this.selectedTagList = [];
    this.tagService.getAll().subscribe((res: Tag[]) => {
      if (res && res.length) {
        this.tagList = res;
        this.tagList.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
      }
    });


  }

  submit() {
    if (this.selectedTagList === null || this.selectedTagList === undefined ||
      this.selectedTagList.length > 3) {
      this.notifier.notify('error', 'You can not select more than 3 tags.');
      return;
    }
    this.userService.update(this.user).subscribe((res: any) => {
      if (res && res.result) {
        this.notifier.notify('success', 'The e-mail notification was successfully updated.');
        Config.setUser(this.user);
      }
    }, error => {
      this.loading = false;
    });
  }

  setTag(event) {
    this.selectedTagList = [];
    this.user.activatedTags = [];
    for (const item of event) {
      this.selectedTagList.push(item.id);
      this.user.activatedTags.push(item);
    }

    if (this.selectedTagList === null || this.selectedTagList === undefined ||
      this.selectedTagList.length > 3) {
      this.notifier.notify('error', 'You can not select more than 3 tags.');
      return;
    }
  }
}
