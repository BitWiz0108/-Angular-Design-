import {Directive, ElementRef, HostListener} from '@angular/core';
import {Toolkit} from "../tools/toolkit";

@Directive({
  selector: '[onlyPhoneNumber]'
})
export class OnlyPhoneNumberDirective {

  constructor(private _el: ElementRef) {
  }

  ngOnInit() {
    this._el.nativeElement.value = '09';
  }

  @HostListener('input', ['$event']) onInputChange(event) {
    var initalValue = Toolkit.Fa2En(this._el.nativeElement.value);
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (this._el.nativeElement.value.split('')[0] !== '0' || this._el.nativeElement.value.split('')[1] !== '9') {
      this._el.nativeElement.value = '09';
    }
    if (this._el.nativeElement.value.split('').length > 11) {
      this._el.nativeElement.value = this._el.nativeElement.value.substring(0,11);
    }
    if ( this._el.nativeElement.value !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
