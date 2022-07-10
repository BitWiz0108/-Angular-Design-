import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
declare var $;

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit, OnChanges {
  @Input() id: string; // modal id
  @Input() _id: string; // selected object id
  @Input() title: string;
  @Input() hasFile: boolean;
  @Output() deleteStatus = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {

  }

  ngOnChanges(changes:SimpleChanges) {
    try {
      this._id = changes._id.currentValue;
      this.title = changes.title.currentValue;
    } catch (e) {

    }
  }

  /**
   * Delete Folder
   * @param val
   */
  deleteAction(val) {
    this.deleteStatus.emit({status: val, _id: this._id});
    $('#'+ this.id).modal('hide');
  }

}

