import {Directive, ElementRef, HostListener} from '@angular/core';
import {Toolkit} from "../tools/toolkit";

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = Toolkit.Fa2En(initalValue.replace(/[^0-9۰-۹]*/g, ''));
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
