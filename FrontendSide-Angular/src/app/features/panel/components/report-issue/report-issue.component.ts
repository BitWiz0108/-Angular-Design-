import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier'; 
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {PaginationInstance} from "ngx-pagination";
import { Config } from 'src/app/config/config';
import { ReportIssue } from 'src/app/features/question/models/reportIssue';
import { ReportService } from 'src/app/features/question/services/report.service';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {

  public Editor = ClassicEditor; 
  reportList: ReportIssue.Action[] = [];
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


  constructor(  private activatedRoute: ActivatedRoute, private router: Router, private reportService: ReportService) { 
    this.token = Config.getLocalStorageToken();
    }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe( (param) => {
      this.status = param.status;
      this.term = '';
      this.getList(0);
    })
  }

  getList(currentPage) {
    this.reportList = [];
    this.loading = true;
    this.config.currentPage = currentPage;
    this.page = currentPage;

    this.reportService.getAll()
    .subscribe((res: any) => { 
      this.loading = false;
      if (res && res.length) {
        // this.totalCount = res.totalElements;
        // this.config.currentPage = res.page
        this.reportList = res;
      } else {
        this.loading = false;
        if (this.term) {
          //this.notifier.notify('warning', 'Unfortunately, we couldn\'t find any question including your keywords. There is either no question including your keywords or your keywords are too general...\n');
        } else {
          //this.notifier.notify('warning', 'There is no question for showing.');
        }
      } 
    });
  }

  navigate(item: ReportIssue.Action) { 
      this.router.navigateByUrl('/panel/question/details?objectId=' + item.paperId);
   
  }

}