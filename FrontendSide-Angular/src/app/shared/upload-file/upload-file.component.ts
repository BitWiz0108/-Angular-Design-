import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {Content} from '../../models/collection/content';
import {ContentService} from '../../services/content.service';
import {ChunkService} from '../../services/chunk.service';
import {UploadStatus} from '../../models/enums/upload-status.enum';
import {ContentType} from '../../models/enums/contentType';
import {Chunk} from '../../models/collection/chunk';
import {Config} from '../../config/config';
import {NotifierService} from 'angular-notifier';

declare var $;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  // @ViewChild('uploadStatus', {static: true}) uploadStatus: ModalComponent;

  @Output() uploadFileDomainOut = new EventEmitter<Content>();
  @Output() contentOut = new EventEmitter<Content>();
  @Input() buttonText = '';
  @Input() _id: any;
  @Input() referenceId: any;
  @Input() className: any;
  @Input() title: any;
  @Input() fieldType: any;
  @Input() field: any;
  @Input() required = false;
  @Input() access: any = 'private';
  @Input() acceptTypes = '.zip,.rar,.tar,.7zip\' +\n' +
    '        \',.jpg,.jpeg,.webp,.psd,.tiff\n' +
    '       ,.mp4,.avi,.wmv,.mpg,.flv\n' +
    '       ,.mp3,.wav,.wma,.ogg,.amr,.m4a\n' +
    '       ,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.odt, .fodt. , .ZIP,.RAR,.TAR,.7ZIP\n' +
    '       ,.JPG,.JPEG,.webp,.PSD,.TIFF\n' +
    '       ,.MP4,.AVI,.WMV,.MPG,.FLV\n' +
    '       ,.MP3,.WAV,.WMA,.OGG,.AMR ,.M4A\n' +
    '       ,.DOC,.DOCX,.XLS,.XLSX,.PPT,.PPTX,.PDF,.ODT, .FODT.';
  fileTitle: string;
  fileErrorList: FileError [] = [];
  ext: string[] = ['zip', 'rar', 'tar', '7zip'
    , 'jpg', 'jpeg', 'png', 'psd', 'tiff'
    , 'mp4', 'avi', 'wmv', 'mpg', 'flv'
    , 'mp3', 'wav', 'wma', 'ogg', 'amr', 'm4a'
    , 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'odt', 'fodt', 'ZIP', 'RAR', 'TAR', '7ZIP'
    , 'JPG', 'JPEG', 'PNG', 'PSD', 'TIFF'
    , 'MP4', 'AVI', 'WMV', 'MPG', 'FLV'
    , 'MP3', 'WAV', 'WMA', 'OGG', 'AMR', 'M4A'
    , 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'PDF', 'ODT', 'FODT'];

  files: any[] = [];
  fileIdAndStatusList: any[] = [];
  speedAv = 0;
  sliceSize: number;
  chunkCount: number;
  chunkNumber = -1;
  uploadCanceled = false;

  currentChunkDetails = {
    piece: 0, start: 0, end: 0, sliceSize: 0, size: 0, file: {}, contentId: '0', index: 0
  };

  startUploading = false;
  createOneFileWentWrong = false;
  index: number;

  uploadSize = 5242880;
  list: any[] = [];
  contentList: any[] = [];

  constructor(private contentService: ContentService,
              private notifierService: NotifierService,
              private chunkService: ChunkService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  ngAfterViewInit(): void {
    $('#myModal').modal('show');
  }

  /**
   * Set Selected File To File Domain And Set Pending Status
   * @param event
   */
  selectFiles(event) {
    this.files = [];
    this.fileIdAndStatusList = [];
    // const speed = new NetSpeedTest();
    // speed.getUploadSpeed().subscribe((res: number) => {
    //   if (!isNullOrUndefined(res)) {
    //     this.speedAv = res;
    //     console.log(this.speedAv);
    //   }
    // });
    this.uploadCanceled = false;
    this.fileErrorList = [];
    console.log(event);
    if (event.target.files.length > 0) {
      this.files = event.target.files;
      for (let i = 0; i < event.target.files.length; i++) {
        this.fileIdAndStatusList.push({name: event.target.files[i].name, uploadStatus: UploadStatus.PENDING});
      }
      $('#uploadFileModal').modal('show');
      this.createFileDomain(0);
    }
  }

  createFileDomain(index) {
    let filename = this.files[index].name;
    filename = filename.replace(/\[/g, '(');
    filename = filename.replace(/\]/g, ')');
    const fileError = new FileError();
    fileError.fileName = filename;
    fileError.fileSize = this.files[index].size;
    const fe = this.files[index].name.split('.').pop();
    if (this.acceptTypes.includes(fe) === false) {
      fileError.error = ' نوع فایل ( ' + fe + ') ';
      this.fileErrorList.push(JSON.parse(JSON.stringify(fileError)));
    } else {
      const contentForOut: Content = new Content();
      contentForOut.fileName = filename;
      contentForOut.title = this.title;
      contentForOut.fileExactType = this.files[index].type;
      contentForOut.fileSize = this.files[index].size;
      if (isNullOrUndefined(contentForOut.fileExactType) || contentForOut.fileExactType === '') {
        const fileNameContent = contentForOut.title.split('.');
        if (fileNameContent[fileNameContent.length - 1] === 'rar') {
          contentForOut.fileExactType = 'application/vnd.rar';
        }
      }
      if (this.createOneFileWentWrong) {
        this.createOneFileWentWrong = false;
      } else {
        this.list.push(contentForOut);
      }
      contentForOut.contentType = ContentType.VOICE;
      contentForOut.uploadStatus = UploadStatus.PENDING;
      contentForOut.extension = '.' + filename.split('.').pop();
      contentForOut.access = this.access;
      contentForOut.creatorId = Config.getLocalStorageUser().id;
      console.log('file domain is =>');
      console.log(contentForOut);
      this.contentService.create(contentForOut).subscribe((res: any) => {
        console.log('createMultiFile', res);
        if (res && res._id) {
          this.contentOut.emit(res);
          this.list = [];
          this.fileIdAndStatusList[index]._id = res._id;
          this.processFile(index);
        } else {
          // this.index = index;
          setTimeout(() => {
            this.index = index;
            this.createOneFileWentWrong = true;
          }, 2000);
        }
      }, error => {
        console.log('errrrrrorrr', error);
      });
    }
    if (index === this.files.length - 1) {
      if (this.fileErrorList.length !== 0) {
        $('#uploadFileModal').modal('show');
      }
    }
  }

  processFile(index) {
    this.chunkNumber = 0;
    const file = this.files[index];
    const size = file.size;
    console.log(size);
    if (size < 50000000) {
      if (this.speedAv >= 500 && this.speedAv <= 700) {
        this.sliceSize = 500000;
      } else if (this.speedAv <= 499) {
        this.sliceSize = 250000;
      } else if (this.speedAv >= 701) {
        this.sliceSize = 1000000;
      } else {
        this.sliceSize = 250000;
      }
    } else {
      if (this.speedAv >= 500 && this.speedAv <= 700) {
        this.sliceSize = 1000000;
      } else if (this.speedAv <= 499) {
        this.sliceSize = 500000;
      } else if (this.speedAv >= 701) {
        this.sliceSize = 2000000;
      } else {
        this.sliceSize = 1000000;
      }
    }
    const sliceSize = this.sliceSize;
    this.chunkCount = Math.ceil(size / sliceSize);
    const start = 0;
    this.loop(start, sliceSize, size, file, index);
  }

  loop(start, sliceSize, size, file, index) {
    let end = start + sliceSize;
    if (size - end < 0) {
      end = size;
    }
    const s = this.slice(file, start, end);
    this.send(s, start, end, sliceSize, size, file, index);
  }

  send(piece, start, end, sliceSize, size, file, index) {
    if (!this.uploadCanceled) {
      this.currentChunkDetails.size = 0;
      const formData = new FormData();
      const chunk = new Chunk();
      this.chunkNumber += 1;
      chunk.chunkNumber = this.chunkNumber;
      chunk.startInByte = start;
      chunk.contentId = this.fileIdAndStatusList[index]._id;
      chunk.endToByte = end;
      if (end === this.files[index].size) {
        chunk.isLastChunk = true;
        if (this.referenceId) {
          chunk.references = {
            _id: this.referenceId, clazz: this.className, field: this.field, type: this.fieldType
          };
        }
      } else {
        chunk.isLastChunk = false;
      }
      formData.append('file', piece);
      formData.append('entity', JSON.stringify(chunk));
      this.chunkService.create(formData).subscribe((res: any) => {
        if (!this.uploadCanceled) {
          if (res) {
            const x = document.getElementById('p-bar' + index);
            const progressValue = 100 / this.chunkCount;
            if (res) {
              x.style.width = (progressValue * chunk.chunkNumber) + '%';
              $('#p-bar' + index).text((Math.ceil(progressValue * chunk.chunkNumber)) + '%');
              console.log('end is ===>', end);
              console.log('size is ===>', size);
              if (end < size) {
                start += sliceSize;
                this.loop(start, sliceSize, size, file, index);
              } else {
                const input = $('#' + this._id);
                input.val('').clone(true);
                setTimeout( () => {
                  $('#uploadFileModal').modal('hide');
                this.fileIdAndStatusList[index].uploadStatus = UploadStatus.ACTIVE;
                this.uploadFileDomainOut.emit(res);
                this.contentList.push(res);
                  this.fileIdAndStatusList = [];
                  this.files = [];
              }, 500);
              }
            }
          } else {
            this.chunkNumber--;
            this.showErrorMessageAndSetCurrentData(piece, start, end, sliceSize, size, file, index);
          }
        }
      }, error => {
        this.chunkNumber--;
        this.showErrorMessageAndSetCurrentData(piece, start, end, sliceSize, size, file, index);
      });
    }
  }

  showErrorMessageAndSetCurrentData(piece, start, end, sliceSize, size, file, index) {
    // this.notifierService.notify('warning', 'خطایی رخ داده است.');
    this.currentChunkDetails.piece = piece;
    this.currentChunkDetails.start = start;
    this.currentChunkDetails.end = end;
    this.currentChunkDetails.sliceSize = sliceSize;
    this.currentChunkDetails.size = size;
    this.currentChunkDetails.file = file;
    this.currentChunkDetails.contentId = this.fileIdAndStatusList[index]._id;
    this.currentChunkDetails.index = index;
  }

  slice(file, start, end) {
    const slices = file.mozSlice ? file.mozSlice :
      file.webkitSlice ? file.webkitSlice :
        file.slice ? file.slice : this.noop;
    return slices.bind(file)(start, end);
  }

  noop() {
  }

  ngOnDestroy(): void {
  }

  cancelUploading() {
    console.log('try to cancel uploading progress');
    if (this.createOneFileWentWrong) {
      $('#uploadFileModal').modal('show');
      return;
    }
    this.uploadCanceled = true;
    console.log('upload canceled');
    const itemIndex = this.fileIdAndStatusList.findIndex(file => file.uploadStatus === UploadStatus.PENDING);
    this.fileIdAndStatusList[itemIndex].uploadStatus = UploadStatus.DELETED;
    this.contentOut.emit(this.fileIdAndStatusList[itemIndex]);
    if (this.fileIdAndStatusList.length > 0 && !isNullOrUndefined(this.fileIdAndStatusList[itemIndex]._id)) {
      this.contentService.delete(this.fileIdAndStatusList[itemIndex]._id, {
        _id: this.referenceId, clazz: this.className, field: this.field, type: this.fieldType
      }).subscribe((res: any) => {
        if (res.data) {
          this.fileIdAndStatusList[itemIndex].uploadStatus = UploadStatus.DELETED;
          this.fileIdAndStatusList[itemIndex]._id = null;
          // this.uploadFileDomainOut.emit(this.fileIdAndStatusList[itemIndex]);
          $('#uploadFileModal').modal('hide');
          this.files = [];
          this.fileIdAndStatusList = [];
          this.chunkNumber = -1;
          this.currentChunkDetails = {
            piece: 0, start: 0, end: 0, sliceSize: 0, size: 0, file: {}, contentId: '0', index: 0
          };
        } else {
          // Notifyme.showNotify('top', 'center', 'danger', 'عملیات انجام نشد دوباره تلاش کنید.');
        }
      });
      this.fileIdAndStatusList[itemIndex].uploadStatus = UploadStatus.DELETED;
      this.fileIdAndStatusList[itemIndex]._id = null;
      // this.uploadFileDomainOut.emit(this.fileIdAndStatusList[itemIndex]);
      this.files = [];
      this.fileIdAndStatusList = [];
    }
    $('#uploadFileModal').modal('hide');
  }

}

export class FileError {
  fileName: string;
  fileSize: number;
  error: string;
}

