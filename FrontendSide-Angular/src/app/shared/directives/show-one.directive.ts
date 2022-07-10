import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appShowOne]'
})
export class ShowOneDirective {

  @Input('appShowOne') id: string;
  @Input() active = false;
  constructor() { }

  @HostBinding('hidden') get hidden() {
    return !this.active;
  }
}
