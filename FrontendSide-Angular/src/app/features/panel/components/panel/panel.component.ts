import { Component, OnInit } from '@angular/core';
import { Config } from "../../../../config/config";
import { User } from "../../../../models/user/user";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  user = new User();

  constructor() {
    this.user = Config.getLocalStorageUser();
  }

  ngOnInit(): void {
  }

  getActiveItem(tabName): string {
    if (window.location.hash.split(tabName).length > 1) {
      return '';
    }
    return 'active';
  }

}
