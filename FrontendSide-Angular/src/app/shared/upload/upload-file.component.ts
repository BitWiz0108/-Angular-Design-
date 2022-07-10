// import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
// import {UploadStatus} from '../../../model/upload-status.enum';
// import {FileDomain} from '../../../model/file-domain';
// import {FileDomainService} from '../../../service/drive/file-domain.service';
// import {FileType} from '../../../model/file-type.enum';
// import {FileModel} from '../../../model/file-model';
// import {DateViewMode} from '../../helper/date-view-mode.enum';
// import {untilDestroyed} from '../../service/take-until-destroy';
// import {Chunk, ChunkStatus} from '../../../model/chunk';
// import {NetSpeedTest} from '../../helper/pipe-module/netSpeedTest';
// import {isNullOrUndefined} from 'util';
// import {ChunkService} from '../../../service/drive/chunk.service';
// import {ModalComponent} from '@angular-boot/widgets';
// import {Notifyme} from '../../notifyme';
// import {ModalSize} from '@angular-boot/util';
// import {CacheType} from '../../cache-service/cache-type.enum';
// import {RHelper} from '../../../model/helper/rhelper';
// import {CacheService} from '../../cache-service/cache.service';
// import {ActivityType} from '../../../model/activity-report';
// import {ActivityReportService} from '../../../service/activity-report.service';
//
// declare var $: any;
//
// @Component({
//   selector: 'app-upload-file',
//   templateUrl: './upload-file.component.html',
//   styleUrls: ['./upload-file.component.scss']
// })
// export class UploadFileComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
//
//   @ViewChild('uploadStatus', {static: true}) uploadStatus: ModalComponent;
//
//   @Output() uploadFileDomainOut = new EventEmitter<FileDomain>();
//   @Output() fileDomainOut = new EventEmitter<FileDomain []>();
//   @Input() parentId: any;
//   @Input() id: any;
//   @Input() uploadType: string;
//   @Input() groupUrl: string;
//   @Input() mobile = false;
//   fileTitle: string;
//   list: FileDomain [] = [];
//   fileDomainList: FileDomain [] = [];
//   dateViewMode = DateViewMode;
//   fileErrorList: FileError [] = [];
//   ext: string[] = ['zip', 'rar', 'tar', '7zip'
//     , 'jpg', 'jpeg', 'png', 'psd', 'tiff'
//     , 'mp4', 'avi', 'wmv', 'mpg', 'flv'
//     , 'mp3', 'wav', 'wma', 'ogg', 'amr', 'm4a'
//     , 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'odt', 'fodt', 'ZIP', 'RAR', 'TAR', '7ZIP'
//     , 'JPG', 'JPEG', 'PNG', 'PSD', 'TIFF'
//     , 'MP4', 'AVI', 'WMV', 'MPG', 'FLV'
//     , 'MP3', 'WAV', 'WMA', 'OGG', 'AMR', 'M4A'
//     , 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'PDF', 'ODT', 'FODT'];
//
//   files: any[] = [];
//   fileIdAndStatusList: any[] = [];
//   speedAv = 0;
//   sliceSize: number;
//   chunkCount: number;
//   chunkNumber = -1;
//   uploadCanceled = false;
//
//   currentChunkDetails = {
//     piece: 0, start: 0, end: 0, sliceSize: 0, size: 0, file: {}, fileDomainId: '0', index: 0
//   };
//
//   startUploading = false;
//   MyModalSize = ModalSize;
//   createOneFileWentWrong = false;
//   private index: number;
//
//   uploadSize = 5242880;
//
//   constructor(private _FileDomainService: FileDomainService,
//               private cacheService: CacheService,
//               private activityReportService: ActivityReportService,
//               private chunkService: ChunkService) {
//   }
//
//   ngOnInit() {
//     this.cacheService.getItem('rh', CacheType.LOCAL_STORAGE).pipe(untilDestroyed(this)).subscribe((role: RHelper) => {
//       if (role) {
//         if (role.t) {
//           this.uploadSize = 26214400;
//         }
//       }
//     });
//   }
//
//   ngOnChanges() {
//   }
//
//   ngAfterViewInit(): void {
//     $('#myModal').modal({backdrop: 'static', keyboard: false});
//   }
//
//   /**
//    * Set Selected File To File Domain And Set Pending Status
//    * @param event
//    */
//   selectFiles(event) {
//     this.files = [];
//     this.fileIdAndStatusList = [];
//     const speed = new NetSpeedTest();
//     speed.getUploadSpeed().subscribe((res: number) => {
//       if (!isNullOrUndefined(res)) {
//         this.speedAv = res;
//         console.log(this.speedAv);
//       }
//     });
//     this.uploadCanceled = false;
//     this.fileErrorList = [];
//     console.log(event);
//     if (event.target.files.length > 0) {
//       this.files = event.target.files;
//       for (let i = 0; i < event.target.files.length; i++) {
//         this.fileIdAndStatusList.push({name: event.target.files[i].name, uploadStatus: UploadStatus.PENDING});
//       }
//       this.uploadStatus.showModal();
//       this.createFileDomain(0);
//     }
//   }
//
//   createFileDomain(index) {
//     let filename = this.files[index].name;
//     filename = filename.replace(/\[/g, '(');
//     filename = filename.replace(/\]/g, ')');
//     const fileError = new FileError();
//     fileError.fileName = filename;
//     fileError.fileSize = this.files[index].size;
//     const fe = this.files[index].name.split('.').pop();
//     if (this.ext.includes(fe) === false) {
//       fileError.error = ' نوع فایل ( ' + fe + ') ';
//       this.fileErrorList.push(JSON.parse(JSON.stringify(fileError)));
//     } else {
//       if (this.files[index].size <= this.uploadSize) {
//         const fileDomainForOut: FileDomain = new FileDomain();
//         fileDomainForOut.fileName = filename;
//         fileDomainForOut.fileContentType = this.files[index].type;
//         if (isNullOrUndefined(fileDomainForOut.fileContentType) || fileDomainForOut.fileContentType === '') {
//           const fileNameContent = fileDomainForOut.fileName.split('.');
//           if (fileNameContent[fileNameContent.length - 1] === 'rar') {
//             fileDomainForOut.fileContentType = 'application/vnd.rar';
//           }
//         }
//         if (this.createOneFileWentWrong) {
//           this.createOneFileWentWrong = false;
//         } else {
//           this.list.push(fileDomainForOut);
//         }
//         const formData = new FormData();
//         const fileDomain: FileDomain = new FileDomain();
//         fileDomain.fileName = filename;
//         fileDomain.fileContentType = this.files[index].type;
//         if (isNullOrUndefined(fileDomain.fileContentType) || fileDomain.fileContentType === '') {
//           const fileNameContent = fileDomain.fileName.split('.');
//           if (fileNameContent[fileNameContent.length - 1] === 'rar') {
//             fileDomain.fileContentType = 'application/vnd.rar';
//           }
//         }
//         fileDomain.group = this.groupUrl;
//         fileDomain.fileModel = new FileModel();
//         fileDomain.fileModel.secure = false;
//         fileDomain.parentId = this.parentId;
//         fileDomain.sizeInByte = this.files[index].size;
//         fileDomain.fileType = FileType.FILE;
//         fileDomain.id = null;
//         fileDomain.uploadStatus = UploadStatus.PENDING;
//         this._FileDomainService.createOneFileNew(fileDomain).subscribe((res: any) => {
//           console.log('createMultiFile', res);
//           if (res && res.flag) {
//             this.fileDomainOut.emit(this.list);
//             this.activityReportService.createActivity({
//               fileSize: this.files[index].size,
//               fileDomainId: res.data.id,
//               activityType: ActivityType.UPLOAD_FILE
//             }).subscribe(log => {
//             });
//             this.list = [];
//             this.fileIdAndStatusList[index] = res.data;
//             this.processFile(index);
//           } else {
//             // this.index = index;
//             setTimeout(() => {
//               this.index = index;
//               this.createOneFileWentWrong = true;
//             }, 1000);
//           }
//           console.log('this.fileDomainList', this.fileDomainList);
//         });
//       } else {
//         fileError.error = 'حجم فایل';
//         this.fileErrorList.push(JSON.parse(JSON.stringify(fileError)));
//         if (this.files.length - 1 > index) {
//           this.createFileDomain(index + 1);
//         }
//       }
//     }
//     if (index === this.files.length - 1) {
//       if (this.fileErrorList.length !== 0) {
//         this.uploadStatus.hideModal();
//         $('#errorFile' + this.id).appendTo('body').modal('show');
//       }
//     }
//   }
//
//   processFile(index) {
//     this.chunkNumber = 0;
//     const file = this.files[index];
//     const size = file.size;
//     console.log(size);
//     if (size < 50000000) {
//       if (this.speedAv >= 500 && this.speedAv <= 700) {
//         this.sliceSize = 500000;
//       } else if (this.speedAv <= 499) {
//         this.sliceSize = 250000;
//       } else if (this.speedAv >= 701) {
//         this.sliceSize = 1000000;
//       } else {
//         this.sliceSize = 250000;
//       }
//     } else {
//       if (this.speedAv >= 500 && this.speedAv <= 700) {
//         this.sliceSize = 1000000;
//       } else if (this.speedAv <= 499) {
//         this.sliceSize = 500000;
//       } else if (this.speedAv >= 701) {
//         this.sliceSize = 2000000;
//       } else {
//         this.sliceSize = 1000000;
//       }
//     }
//     const sliceSize = this.sliceSize;
//     this.chunkCount = Math.ceil(size / sliceSize);
//     const start = 0;
//     this.loop(start, sliceSize, size, file, index);
//   }
//
//   loop(start, sliceSize, size, file, index) {
//     let end = start + sliceSize;
//     if (size - end < 0) {
//       end = size;
//     }
//     const s = this.slice(file, start, end);
//     this.send(s, start, end, sliceSize, size, file, index);
//   }
//
//   send(piece, start, end, sliceSize, size, file, index) {
//     if (!this.uploadCanceled) {
//       this.currentChunkDetails.size = 0;
//       const formData = new FormData();
//       const chunk = new Chunk();
//       this.chunkNumber += 1;
//       chunk.chunkNumber = this.chunkNumber;
//       chunk.startInByte = start;
//       chunk.fileDomainId = this.fileIdAndStatusList[index].id;
//       chunk.endToByte = end;
//       chunk.status = ChunkStatus.Active;
//       if (end === this.files[index].size) {
//         chunk.isLastChunk = true;
//       } else {
//         chunk.isLastChunk = false;
//       }
//       formData.append('file', piece);
//       formData.append('entity', new Blob([JSON.stringify(chunk)], {type: 'application/json'}));
//       this.chunkService.createChunk(formData).pipe(untilDestroyed(this)).subscribe((res: any) => {
//         console.log(res);
//         if (!this.uploadCanceled) {
//           if (res && res.flag) {
//             const x = document.getElementById('p-bar' + index);
//             const progressValue = 100 / this.chunkCount;
//             if (res.flag) {
//               x.style.width = (progressValue * chunk.chunkNumber) + '%';
//               $('#p-bar' + index).text((Math.ceil(progressValue * chunk.chunkNumber)) + '%');
//               if (end < size) {
//                 start += sliceSize;
//                 this.loop(start, sliceSize, size, file, index);
//               } else {
//                 this.fileIdAndStatusList[index].uploadStatus = UploadStatus.ACTIVE;
//                 this.uploadFileDomainOut.emit(res.data);
//                 this.fileDomainList.push(res.data);
//                 if (this.fileIdAndStatusList.filter(f => f.uploadStatus === UploadStatus.PENDING).length < 1) {
//                   const input = $('#' + this.id);
//                   input.val('').clone(true);
//                   this.fileIdAndStatusList = [];
//                   this.files = [];
//                   this.uploadStatus.hideModal();
//                 } else {
//                   this.createFileDomain(index + 1);
//                 }
//               }
//             }
//           } else {
//             this.chunkNumber--;
//             this.showErrorMessageAndSetCurrentData(piece, start, end, sliceSize, size, file, index);
//           }
//         } else {
//           this.chunkNumber--;
//           this.showErrorMessageAndSetCurrentData(piece, start, end, sliceSize, size, file, index);
//         }
//       }, error => {
//         this.chunkNumber--;
//         this.showErrorMessageAndSetCurrentData(piece, start, end, sliceSize, size, file, index);
//       });
//     }
//   }
//
//   showErrorMessageAndSetCurrentData(piece, start, end, sliceSize, size, file, index) {
//     Notifyme.showNotify('top', 'center', 'danger', 'خطایی رخ داده است.');
//     this.currentChunkDetails.piece = piece;
//     this.currentChunkDetails.start = start;
//     this.currentChunkDetails.end = end;
//     this.currentChunkDetails.sliceSize = sliceSize;
//     this.currentChunkDetails.size = size;
//     this.currentChunkDetails.file = file;
//     this.currentChunkDetails.fileDomainId = this.fileIdAndStatusList[index].id;
//     this.currentChunkDetails.index = index;
//   }
//
//   slice(file, start, end) {
//     const slices = file.mozSlice ? file.mozSlice :
//       file.webkitSlice ? file.webkitSlice :
//         file.slice ? file.slice : this.noop;
//     return slices.bind(file)(start, end);
//   }
//
//   noop() {
//   }
//
//   ngOnDestroy(): void {
//   }
//
//   cancelUploading() {
//     if (this.createOneFileWentWrong) {
//       this.uploadStatus.hideModal();
//       return;
//     }
//     this.uploadCanceled = true;
//     const itemIndex = this.fileIdAndStatusList.findIndex(file => file.uploadStatus === UploadStatus.PENDING);
//     this._FileDomainService.cancelUploadFile(this.fileIdAndStatusList[itemIndex].id).subscribe((res: any) => {
//       if (res.data) {
//         this.fileIdAndStatusList[itemIndex].uploadStatus = UploadStatus.DELETE;
//         this.fileIdAndStatusList[itemIndex].id = null;
//         this.uploadFileDomainOut.emit(this.fileIdAndStatusList[itemIndex]);
//         this.uploadStatus.hideModal();
//         this.files = [];
//         this.fileIdAndStatusList = [];
//         this.chunkNumber = -1;
//         this.currentChunkDetails = {
//           piece: 0, start: 0, end: 0, sliceSize: 0, size: 0, file: {}, fileDomainId: '0', index: 0
//         };
//       } else {
//         // Notifyme.showNotify('top', 'center', 'danger', 'عملیات انجام نشد دوباره تلاش کنید.');
//       }
//     });
//     this.fileIdAndStatusList[itemIndex].uploadStatus = UploadStatus.DELETE;
//     this.fileIdAndStatusList[itemIndex].id = null;
//     this.uploadFileDomainOut.emit(this.fileIdAndStatusList[itemIndex]);
//     this.uploadStatus.hideModal();
//   }
// }
//
// export class FileError {
//   fileName: string;
//   fileSize: number;
//   error: string;
// }
