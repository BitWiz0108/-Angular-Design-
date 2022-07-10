import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appPasswordStrength]'
})
export class PasswordStrengthDirective  implements OnInit,OnChanges {
  @Input() password: string = '';
  @Input() showMessage: boolean = false;
  messageElement: any;
  strengthElement: any;
  strengthBarElement: any;
  bar1Element: any;
  bar2Element: any;
  bar3Element: any;
  bar4Element: any;
  color = '#ff0000';
  message = ' Bad ';

  constructor(private el: ElementRef,
              private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.showMessage) {
      this.strengthElement = this.renderer.createElement('div');
      this.renderer.addClass(this.strengthElement, 'strength');
      this.strengthBarElement = this.renderer.createElement('ul');
      this.bar1Element = this.renderer.createElement('li');
      this.bar2Element = this.renderer.createElement('li');
      this.bar3Element = this.renderer.createElement('li');
      this.bar4Element = this.renderer.createElement('li');
      this.renderer.addClass(this.strengthBarElement, 'strengthBar');
      this.renderer.addClass(this.bar1Element, 'point');
      this.renderer.addClass(this.bar2Element, 'point');
      this.renderer.addClass(this.bar3Element, 'point');
      this.renderer.addClass(this.bar4Element, 'point');
      this.renderer.appendChild(this.strengthBarElement, this.bar1Element);
      this.renderer.appendChild(this.strengthBarElement, this.bar2Element);
      this.renderer.appendChild(this.strengthBarElement, this.bar3Element);
      this.renderer.appendChild(this.strengthBarElement, this.bar4Element);
      this.renderer.appendChild(this.strengthElement, this.strengthBarElement);
      this.messageElement = this.renderer.createElement('p');
      this.renderer.appendChild(this.strengthElement, this.messageElement);
      this.el.nativeElement.after(this.strengthElement);
      this.renderer.setStyle(this.messageElement, 'text-align', 'center');
      this.renderer.setStyle(this.messageElement, 'text-shadow', '1px 1px 1px #000000');
    }
    this.passwordDifficulty(this.password);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.passwordDifficulty(changes.password.currentValue);
  }

  passwordDifficulty(value) {
    if (this.showMessage) {
      this.renderer.setStyle(this.bar1Element, 'background', '#DDD');
      this.renderer.setStyle(this.bar2Element, 'background', '#DDD');
      this.renderer.setStyle(this.bar3Element, 'background', '#DDD');
      this.renderer.setStyle(this.bar4Element, 'background', '#DDD');
    }
    if (!value) {
      this.color = '#ff0000';
      this.el.nativeElement.style.borderBottom = `1px solid ${this.color}`;
      if (this.showMessage) {
        this.renderer.setStyle(this.messageElement, 'color', this.color);
        this.renderer.setProperty(this.messageElement, 'innerHTML', `Password strength : Bad `);
      }
      return;
    }
    const valid = this.hasNumber(value) + this.hasLowercaseLetter(value) +
      this.hasUppercaseLetter(value) + this.hasSpecialCharacter(value);
    if (value.length < 9) {
      this.color = '#ff0000';
      this.el.nativeElement.style.borderBottom = `1px solid ${this.color}`;
      if (this.showMessage) {
        this.renderer.setStyle(this.messageElement, 'color', this.color);
        this.renderer.setProperty(this.messageElement, 'innerHTML', `Password strength : Bad `);
      }
    } else {
      switch (valid) {
        case 4:
          if (this.showMessage) {
            this.renderer.setStyle(this.bar1Element, 'background', '#0f0');
            this.renderer.setStyle(this.bar2Element, 'background', '#0f0');
            this.renderer.setStyle(this.bar3Element, 'background', '#0f0');
            this.renderer.setStyle(this.bar4Element, 'background', '#0f0');
          }
          this.color = '#00ff00';
          this.message = ' Strict ';
          break;
        case 3:
          if (this.showMessage) {
            this.renderer.setStyle(this.bar1Element, 'background', '#d4ff05');
            this.renderer.setStyle(this.bar2Element, 'background', '#d4ff05');
            this.renderer.setStyle(this.bar3Element, 'background', '#d4ff05');
          }
          this.color = '#d4ff05';
          this.message = ' Hard ';
          break;
        case 2:
          if (this.showMessage) {
            this.renderer.setStyle(this.bar1Element, 'background', '#ffac00');
            this.renderer.setStyle(this.bar2Element, 'background', '#ffac00');
          }
          this.color = '#ffac00';
          this.message = ' Normal ';
          break;
        case 1:
          if (this.showMessage) {
            this.renderer.setStyle(this.bar1Element, 'background', '#ff4700');
          }
          this.color = '#ff4700';
          this.message = ' poor ';
          break;
        default:
          this.color = '#ff0000';
          this.message = ' bad ';
          break;
      }
      this.el.nativeElement.style.borderBottom = `1px solid ${this.color}`;
      if (this.showMessage) {
        this.renderer.setStyle(this.messageElement, 'color', this.color);
        this.renderer.setProperty(this.messageElement, 'innerHTML', `Password strength : ${this.message}`);
      }
    }
  }

  hasNumber(value): number {
    return /([0-9])+/.test(value) ? 1 : 0
  }

  hasLowercaseLetter(value): number {
    return /([a-z])+/.test(value) ? 1 : 0
  }

  hasUppercaseLetter(value): number {
    return /([A-Z])+/.test(value) ? 1 : 0
  }

  hasSpecialCharacter(value): number {
    return /([!@#$%^&*()])+/.test(value) ? 1 : 0
  }

}
