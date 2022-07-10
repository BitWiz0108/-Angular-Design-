import { Injectable } from '@angular/core';
import { ServiceBaseService } from '../../../services/service-base.service';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import axios from "axios";
import { API_URL } from 'src/app/config/serverConfig';

@Injectable({
  providedIn: 'root',
})
export class UploadPresentationService extends ServiceBaseService {
  constructor(public http: HttpClient) {
    super(http);
    this.prefix = 'uploadPresentations';
  }

  uploadFile(formData: FormData) {
    return super.postService('/upload', formData);
  }

  downloadFile(videoPath:string){
    return super.postService('/download' ,videoPath);
  }

  getFileBytes = (filePath:string) => {
    return axios.post(API_URL + 'api/uploadPresentations/download', [filePath], {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer "+localStorage.getItem("token"),
      },
      responseType: "blob",
    });
  };
  
}


