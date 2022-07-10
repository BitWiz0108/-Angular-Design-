import {Component, OnInit} from '@angular/core';
import {JwtService} from '../../../services/jwt.service';
import {Config} from '../../../config/config';
import {Role} from '../../../models/enums/role';
import {User} from '../../../models/user/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../dashboard.component.scss']
})
export class SidebarComponent implements OnInit {

  user = new User();
  constructor(private jwtService: JwtService) {
    this.user = Config.getLocalStorageUser();
  }

  ngOnInit() {
  }

}
