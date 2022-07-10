import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {Config} from "../../config/config";
import {Router} from "@angular/router";

declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {
    if (isNullOrUndefined(Config.getLocalStorageToken()) || Config.getLocalStorageToken() === '') {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
  }

}
