import { Component, OnInit } from '@angular/core';
import { Config } from "../../config/config";
import { NotifierService } from "angular-notifier";
import { User } from "../../models/user/user";
import { ActionMode } from "../../models/enums/actionMode";
import { ActivatedRoute, Router } from "@angular/router";
import { TagService } from '../../features/question/services/tag.service';
import { Question } from '../../features/question/models/question';
import Tag = Question.Tag;

declare var $;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  token: string;
  user = new User();
  ActionMode = ActionMode;
  term: string;
  loading = false;
  selectedTagList = [];
  tagList: Tag[] = [];
  searchSelectionList = [];
  showTextSearch = true;

  constructor(private notifierService: NotifierService,
    private tagService: TagService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.token = Config.getLocalStorageToken();
    this.user = Config.getLocalStorageUser();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query: any) => {
      this.term = query.term ? query.term : '';
      this.selectedTagList = query.selectedTagList ? query.selectedTagList.split(",") : [];
      this.showTextSearch = ! this.selectedTagList.length;
    })
    this.searchSelectionList.push('Text');
    this.searchSelectionList.push('Tags');
    this.getTagList();
  }

  getTagList() {
    this.tagService.getAll().subscribe((res: Tag[]) => {
      if (res && res.length) {
        this.tagList = res;
        this.tagList.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      }
    });
  }

  showMessage() {
    this.notifierService.notify('error', 'be patient, We are working on it.')
  }

  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  clearLocalStorage() {
    localStorage.clear();
    this.token = null;
    this.user = new User();
    this.router.navigateByUrl('/');
  }

  getActiveItem(tabName): string {
    if (window.location.hash.split(tabName).length > 1) {
      return 'active';
    }
    return '';
  }

  openModal(modalId: string) {
    $('#' + modalId).modal('show');
  }

  search() {
    this.router.navigateByUrl('/question/list?term=' + this.term + "&selectedTagList=" + this.selectedTagList + '&page=1&size=10');
  }

  setTag(event) {
    this.selectedTagList = [];
    for (const item of event) {
      this.selectedTagList.push(item.id);
    }
    this.term = "";
    this.search()
  }

  setSearchOption(option) {
    if ("Text" === option) {
      this.searchSelectionList[0];
      this.showTextSearch = true;
    } else {
      this.searchSelectionList[1];
      this.showTextSearch = false;
      this.term = '';
    }
  }

  cleanSearch() {
    this.selectedTagList = [];
  }

  onActivate(e) {
    this.user = Config.getLocalStorageUser();
    this.token = Config.getLocalStorageToken();
  }

  reloadComponent(path) {  
    let currentUrl = path;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);

        // this.getTagList();
    }
    
}
