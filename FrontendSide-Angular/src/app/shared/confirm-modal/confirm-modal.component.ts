import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

declare var $;

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit, OnChanges {

  @Input() id: string; // modal id
  @Input() _id: string; // selected object id
  @Input() text: string;
  @Input() hasFile: boolean;
  @Input() withOutAya = false;
  @Output() confirmStatus = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      this._id = changes._id.currentValue;
      this.text = changes.title.currentValue;
    } catch (e) {

    }
  }

  setConfirmStatus(val) {
    this.confirmStatus.emit({status: val});
    $('#' + this.id).modal('hide');
  }

}
