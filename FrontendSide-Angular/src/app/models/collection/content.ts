import {ContentType} from "../enums/contentType";
import {UploadStatus} from "../enums/upload-status.enum";

export class Content {
  _id: string;
  title: string;
  fileName: string;
  contentType: ContentType;
  fileExactType: string;
  md5: string;
  fileSize: number;
  uploadStatus: UploadStatus;
  createdAt: any;
  creatorId: string;
  extension: string;
  caption: string;
  access: string;
  isObsolete = false;
  activeClass = false;

  constructor(uploadStatus?: UploadStatus) {
    this.uploadStatus = uploadStatus;
    this.contentType = ContentType.VIDEO;
  }
}
