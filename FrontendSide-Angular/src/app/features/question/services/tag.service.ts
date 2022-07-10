import { Injectable } from '@angular/core';
import {ServiceBaseService} from "../../../services/service-base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TagService  extends ServiceBaseService{

  constructor(public http: HttpClient) {
    super(http);
    this.prefix = 'tags'
  }

}
