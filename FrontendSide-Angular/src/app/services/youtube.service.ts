import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { YOUTUBE_URL, YOUTUBE_KEY } from '../config/serverConfig';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(public http: HttpClient) {
  }

  search(textToBeSearch: any) {
    const url = YOUTUBE_URL + textToBeSearch + "&key=" + YOUTUBE_KEY;
    return this.http.get(url);
  }
}
